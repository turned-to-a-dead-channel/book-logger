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
            <div className="flex flex-row justify-between">
                <a className="text-amber-500 cursor-pointer" onClick={() => router.replace("/")}>Go Home</a>
                <div className = "flex flex-row items-center justify-center">
                    <span className='font-mono uppercase text-xs text-muted tracking-wider-than-widest mr-3'>
                        View: 
                    </span>
                    <div>
                        <List className={`${view == 'list' ? 'text-amber-500' : 'text-muted'} mr-3 text-xs hover:text-amber-500`} onClick={() => setView("list")}/>
                    </div>
                    <div className="p-3 border-gray-50">
                        <BookImage className={`${view == 'cover' ? 'text-amber-500' : 'text-muted'} text-xs hover:text-amber-500`} onClick={() => setView("cover")}/>
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