"use client";
import { useUser } from './usercontext';
import { createContext, useContext, useState, useEffect } from 'react';

const BooksContext = createContext<{
  books: any[];
  isLoading: boolean;
}>({ books: [], isLoading: true });

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        fetch(`/api/books/${user.user_uid}`)
        .then(res => res.json())
        .then(data => setBooks(data))
        .finally(() => setIsLoading(false))
    }, [user])

    return (
        <BooksContext.Provider value={{ books, isLoading }} >
            {children}
        </BooksContext.Provider>
    )
}

export const useBooks = () => useContext(BooksContext);