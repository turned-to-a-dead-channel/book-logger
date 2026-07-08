import { BookInfoData } from "./types";

export const getCurrentlyReading = (books: BookInfoData[]) => {
    return books.filter(b => b.status === 'currently reading');
}

export const getStarType = (rating: number, position: number) => {
    if (rating >= position) return 'full';
    if (rating >= position - 0.5) return 'half';
    return 'empty';
}

export const getToRead = (books: BookInfoData[]) => {
    return books.filter(b => b.status === 'to read').sort((a, b) => {
        if (a.priority_order == null) return 1;
        if (b.priority_order == null) return -1;
        return a.priority_order - b.priority_order;
    })
}