import { postBookThought } from '@/lib/queries/booksthoughts'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userBooksuid, thought, pageRef } = await request.json()
  await postBookThought({ userBooksuid, thought, pageRef })
  return NextResponse.json({ success: true })
}