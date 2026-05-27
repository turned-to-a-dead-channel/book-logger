import { getBooksByUserUid } from '@/lib/queries/books'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params
  const books = await getBooksByUserUid(uid)
  return NextResponse.json(books)
}