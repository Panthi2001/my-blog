import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// stores conversation state for each user
const sessions: Record<number, {
    step: string
    data: Record<string, string>
}> = {}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const ALLOWED_CHAT_ID = Number(process.env.TELEGRAM_CHAT_ID)

// send a message back to telegram
async function sendMessage(chatId: number, text: string, keyboard?: object) {
    const body: Record<string, unknown> = {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
    }

    if (keyboard) {
        body.reply_markup = keyboard
    }

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
}

// category selection keyboard
const categoryKeyboard = {
    inline_keyboard: [
        [
            { text: "Movies", callback_data: "movies" },
            { text: "Books", callback_data: "books" },
        ],
        [
            { text: "Poetry", callback_data: "poetry" },
            { text: "Food", callback_data: "food" },
        ],
        [
            { text: "Life", callback_data: "life" },
            { text: "Abstract", callback_data: "abstract" },
        ],
        [
            { text: "Photography", callback_data: "photography" },
        ],
    ],
}

// publish keyboard
const publishKeyboard = {
    inline_keyboard: [
        [
            { text: "Publish now", callback_data: "publish_yes" },
            { text: "Save as draft", callback_data: "publish_no" },
        ],
    ],
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    // handle button clicks
    if (body.callback_query) {
        const query = body.callback_query
        const chatId = query.message.chat.id
        const data = query.data

        // block anyone who is not you
        if (chatId !== ALLOWED_CHAT_ID) {
            await sendMessage(chatId, "Unauthorized.")
            return NextResponse.json({ ok: true })
        }

        const session = sessions[chatId]

        // category selected
        if (["movies", "books", "poetry", "food", "life", "abstract", "photography"].includes(data)) {
            sessions[chatId] = { step: "title", data: { category: data } }
            await sendMessage(chatId, `Category set to <b>${data}</b>.\n\nNow send me the <b>title</b> of your post.`)
        }

        // publish decision
        if (data === "publish_yes" || data === "publish_no") {
            const published = data === "publish_yes"
            const postData = session.data

            // auto generate slug from title
            const slug = postData.title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-")
                .trim()

            const { error } = await supabase.from("posts").insert({
                title: postData.title,
                slug,
                category: postData.category,
                date: new Date().toISOString().split("T")[0],
                excerpt: postData.excerpt,
                description: postData.description || "",
                content: postData.content,
                images: [],
                published,
            })

            if (error) {
                await sendMessage(chatId, `Error saving post: ${error.message}`)
            } else {
                await sendMessage(
                    chatId,
                    published
                        ? `Post published! Visit your blog to see it.`
                        : `Post saved as draft. You can publish it from the admin panel.`
                )
            }

            // clear session
            delete sessions[chatId]
        }

        return NextResponse.json({ ok: true })
    }

    // handle text messages
    const message = body.message
    if (!message || !message.text) return NextResponse.json({ ok: true })

    const chatId = message.chat.id
    const text = message.text.trim()

    // block anyone who is not you
    if (chatId !== ALLOWED_CHAT_ID) {
        await sendMessage(chatId, "Unauthorized.")
        return NextResponse.json({ ok: true })
    }

    // start command
    if (text === "/start" || text === "/new") {
        sessions[chatId] = { step: "category", data: {} }
        await sendMessage(chatId, "Let's create a new post. Choose a category:", categoryKeyboard)
        return NextResponse.json({ ok: true })
    }

    // cancel command
    if (text === "/cancel") {
        delete sessions[chatId]
        await sendMessage(chatId, "Cancelled. Send /new to start again.")
        return NextResponse.json({ ok: true })
    }

    const session = sessions[chatId]

    // no active session
    if (!session) {
        await sendMessage(chatId, "Send /new to create a new post.")
        return NextResponse.json({ ok: true })
    }

    // handle each step
    if (session.step === "title") {
        session.data.title = text
        session.step = "excerpt"
        await sendMessage(chatId, "Now send me the <b>excerpt</b> — a short preview shown on the homepage.")
    }

    else if (session.step === "excerpt") {
        session.data.excerpt = text
        session.step = "description"
        await sendMessage(chatId, "Now send me the <b>description</b> — context behind the post. Or send /skip to leave it empty.")
    }

    else if (session.step === "description") {
        session.data.description = text === "/skip" ? "" : text
        session.step = "content"
        await sendMessage(chatId, "Now send me the full <b>content</b> of your post. You can use markdown.")
    }

    else if (session.step === "content") {
        session.data.content = text
        session.step = "publish"
        await sendMessage(
            chatId,
            `Ready to save:\n\n<b>${session.data.title}</b>\nCategory: ${session.data.category}\n\nPublish now or save as draft?`,
            publishKeyboard
        )
    }

    return NextResponse.json({ ok: true })
}