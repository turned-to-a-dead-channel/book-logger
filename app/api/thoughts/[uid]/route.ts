import pool from '@/lib/db'
import { deleteBookThought, updateBookThought } from '@/lib/queries/booksthoughts'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: Promise<{ uid: string }> }) {
    const { uid } = await params
    await deleteBookThought(uid)
    return NextResponse.json({ success: true })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ uid: string }> }) {
    const { uid } = await params;
    const { thought, pageRef } = await request.json()
    await updateBookThought({ uid, thought, pageRef })
    return NextResponse.json({ success: true })
}