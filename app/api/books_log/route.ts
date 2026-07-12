import { postBookLog } from '@/lib/queries/bookslog'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userBooksuid, dateLogged = new Date(), startPage, endPage, quote, isFinished = false } = await request.json()
  await postBookLog({ userBooksuid, dateLogged, startPage, endPage, quote, isFinished })
  return NextResponse.json({ success: true })
}