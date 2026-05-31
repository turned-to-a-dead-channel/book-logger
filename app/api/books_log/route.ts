import { postBookLog } from '@/lib/queries/bookslog'
import { dates } from "@/lib/dates";
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { uid, startPage, endPage, quote } = await request.json()
  await postBookLog({ uid, dateLogged: dates.todayRaw, startPage, endPage, quote })
  return NextResponse.json({ success: true })
}
