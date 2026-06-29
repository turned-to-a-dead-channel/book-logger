'use client';
import { useModal } from '@/context/modalcontext';
import { dates } from '@/lib/dates';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { BookImage, List } from "lucide-react";
import BooksReadListView from '@/components/booksreadlistview';
import BooksReadCoverView from '@/components/booksreadcoverview';

const BooksPage = () => {
    const [user, setUser] = useState<any>(null)
    const [books, setBooks] = useState<any[]>([])
    const [sortKey, setSortKey] = useState('date_finished');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [view, setView] = useState<'list' | 'cover'>('list');
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

    const onSort = (key: string) => {
        if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('asc'); }
    };
    
    return (
        <div className="m-5">
            <div className="flex flex-col md:flex-row justify-between mb-10">
                <div className='m-5 flex flex-row font-mono border border-gray-800 rounded-2xl text-sm text-muted uppercase'>
                    <span className="p-3 pl-7 font-bold tracking-wider-than-widest">Sort By: </span>
                    <span className={`p-3 cursor-pointer ${sortKey === "title" ? 'text-amber-500' : "text-muted"} transition duration-200 hover:text-amber-400`} onClick={() => onSort('title')}>
                        Title {sortKey === 'title' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                    <span className={`p-3 cursor-pointer ${sortKey === "author" ? 'text-amber-500' : "text-muted"} hover:text-amber-400 transition duration-200`} onClick={() => onSort('author')}>
                        Author {sortKey === 'author' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                    <span className={`p-3 cursor-pointer ${sortKey === "page_count" ? 'text-amber-500' : "text-muted"} transition duration-200 hover:text-amber-400`} onClick={() => onSort('page_count')}>
                        Pages {sortKey === 'page_count' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                    <span className={`p-3 cursor-pointer ${sortKey === "date_finished" ? 'text-amber-500' : "text-muted"} transition duration-200 hover:text-amber-400`} onClick={() => onSort('date_finished')}>
                        Date Finished {sortKey === 'date_finished' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                    <span className={`p-3 pr-7 cursor-pointer ${sortKey === "rating" ? 'text-amber-500' : "text-muted"} transition duration-200 hover:text-amber-400`} onClick={() => onSort('rating')}>
                        Rating {sortKey === 'rating' && (sortDir === 'asc' ? '↑' : '↓')}
                    </span>
                </div>
                <div className = "flex flex-row items-center justify-center border  border-gray-800 rounded-2xl uppercase text-sm m-5">
                    <span className='font-mono font-bold text-muted tracking-wider-than-widest mr-3 pl-7'>
                        View: 
                    </span>
                    <div className='p-3 pr-7'>
                        <List className={`${view == 'list' ? 'text-amber-500' : 'text-muted'} hover:text-amber-400 block`} onClick={() => setView("list")}/>
                    </div>
                    <div className='p-3 pr-7'>
                        <BookImage className={`${view == 'cover' ? 'text-amber-500' : 'text-muted'} hover:text-amber-400 block`} onClick={() => setView("cover")}/>
                    </div>
                </div>
            </div>
            <div className="m-5">
                { view === "list" ? (
                        <BooksReadListView
                            data={sorted}
                            sortKey={sortKey}
                            sortDir={sortDir}
                            onSort={onSort}
                        />
                    ) : (
                        <BooksReadCoverView
                            data={sorted}
                            sortKey={sortKey}
                            sortDir={sortDir}
                            onSort={onSort}
                        />
                    )
                }
            </div>
        </div>
    )
};

export default BooksPage;