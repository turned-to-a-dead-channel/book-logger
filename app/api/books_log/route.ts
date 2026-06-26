import { postBookLog } from '@/lib/queries/bookslog'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userBooksuid, startPage, endPage, quote } = await request.json()
  await postBookLog({ userBooksuid, dateLogged: new Date(), startPage, endPage, quote })
  return NextResponse.json({ success: true })
}