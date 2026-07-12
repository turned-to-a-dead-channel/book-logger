import { getBooksLogs } from '@/lib/queries/bookslog'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ userUid: string }> }) {
  const { userUid } = await params
  const logs = await getBooksLogs({ userUid })
  return NextResponse.json(logs)
}