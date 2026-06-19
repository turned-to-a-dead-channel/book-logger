'use client';
import { useModal } from '@/context/modalcontext';
import { dates } from '@/lib/dates';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getRandomColor, bgColors, borderColors } from "@/lib/colors";

const BooksPage = () => {
    const [user, setUser] = useState<any>(null)
    const [books, setBooks] = useState<any[]>([])
    const [sortKey, setSortKey] = useState('date_finished');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const { activeModal, setActiveModal } = useModal();
    const router = useRouter();

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
            setUser(data)
            return fetch(`/api/books/${data.user_uid}`)
            })
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    console.log(books);

    const finishedThisYear = books.filter(b => {
        if (!b.date_finished) return false
        return b.status === 'finished' && b.date_finished.includes(dates.currYearNumeric)
    })

    const sorted = [...finishedThisYear].sort((a, b) => {
        const valA = typeof a[sortKey] === 'number' ? a[sortKey] : (a[sortKey] ?? '');
        const valB = typeof b[sortKey] === 'number' ? b[sortKey] : (b[sortKey] ?? '');
        return valA < valB
            ? sortDir === 'asc' ? -1 : 1
            : valA > valB
            ? sortDir === 'asc' ? 1 : -1
            : 0;
    });

    const handleSort = (key: string) => {
        if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('asc'); }
    };
    
    return (
        <div className="m-5">
            <a className="text-amber-500 cursor-pointer" onClick={() => router.replace("/")}>Go Home</a>
            <div className="m-5">
                <table className="w-full m-5 [&_td]:px-4 [&_td]:py-2 [&_th]:px-4 [&_th]:py-2">
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th className="cursor-pointer text-left" onClick={() => handleSort('title')}>
                            Title {sortKey === 'title' && (sortDir === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="cursor-pointer text-left" onClick={() => handleSort('author')}>
                            Author {sortKey === 'author' && (sortDir === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="cursor-pointer" onClick={() => handleSort('page_count')}>
                            Pages {sortKey === 'page_count' && (sortDir === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="cursor-pointer" onClick={() => handleSort('date_finished')}>
                            Date Finished {sortKey === 'date_finished' && (sortDir === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="cursor-pointer" onClick={() => handleSort('rating')}>
                            Rating {sortKey === 'rating' && (sortDir === 'asc' ? '↑' : '↓')}
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    { sorted.map((book, index) => (
                        <tr key={`book-${book.book_id}`} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>  
                            <td>{index + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    {book.cover ? 
                                        <img src={`${book.cover}`} className="w-10 h-14 object-cover inline mr-3" /> : 
                                        <div className={`w-10 h-14 ${getRandomColor(bgColors)} overflow-hidden inline-block mr-3`}></div>
                                    }
                                    { book.title }
                                </div>
                            </td>
                            <td>{ book.author }</td>
                            <td className="text-center">{ book.page_count }</td>
                            <td className="text-left">{book.date_finished ? new Date(book.date_finished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
                            <td className="text-center">{ book.rating }</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default BooksPage;