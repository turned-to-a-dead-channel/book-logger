import pool from '@/lib/db'
import { deleteBookLog, updateBookLog } from '@/lib/queries/bookslog'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: Promise<{ uid: string }> }) {
    const { uid } = await params
    await deleteBookLog(uid)
    return NextResponse.json({ success: true })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ uid: string }> }) {
    const { uid } = await params;
    const { dateLogged, startPage, endPage, isFinished } = await request.json()
    await updateBookLog({ logUid: uid, dateLogged, startPage, endPage, isFinished })
    return NextResponse.json({ success: true })
}