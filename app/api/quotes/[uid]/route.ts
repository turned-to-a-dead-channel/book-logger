import pool from '@/lib/db'
import { deleteBookQuote, updateBookQuote } from '@/lib/queries/booksquotes'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: Promise<{ uid: string }> }) {
    const { uid } = await params
    await deleteBookQuote(uid)
    return NextResponse.json({ success: true })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ uid: string }> }) {
    const { uid } = await params;
    const { quote, pageRef } = await request.json()
    await updateBookQuote({ uid, quote, pageRef })
    return NextResponse.json({ success: true })
}