"use client";
import { useUser } from './usercontext';
import { createContext, useContext, useState, useEffect } from 'react';

const BooksContext = createContext<{
  books: any[];
  logs: any[];
  isLoading: boolean;
}>({ books: [], logs: [], isLoading: true });

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    const [books, setBooks] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        fetch(`/api/books/${user.user_uid}`)
        .then(res => res.json())
        .then(data => {
        setBooks(data)
        return fetch(`/api/books_log/${user.user_uid}`)
        })
        .then(res => res.json())
        .then(data => setLogs(data))
        .finally(() => setIsLoading(false))
    }, [user])

    console.log(logs);
    
    return (
        <BooksContext.Provider value={{ books, logs, isLoading }} >
            {children}
        </BooksContext.Provider>
    )
}

export const useBooks = () => useContext(BooksContext);
export const useLogs = () => useContext(BooksContext);