import { BookInfoData } from "./types";

export const getCurrentlyReading = (books: BookInfoData[]) => {
    return books.filter(b => b.status === 'currently reading');
}

export const getToRead = (books: BookInfoData[]) => {
    return books.filter(b => b.status === 'to read');
}