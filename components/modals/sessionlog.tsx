"use client";
import { useEffect, useState } from 'react';
import { ModalProps } from "@/lib/types";
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBooks } from "@/context/bookscontext";

const SessionModal = ({ isOpen, onClose, currentlyReading, todayString }: ModalProps & { currentlyReading: any[], todayString: string }) => {
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [startPage, setStartPage] = useState<number>(selectedBook?.current_page ?? 0);
    const [endPage, setEndPage] = useState<number | null>(null);
    const [quote, setQuote] = useState("");
    const pagesRead = endPage !== null ? endPage - startPage : null;
    const { refresh } = useBooks();
    const router = useRouter();

    useEffect(() => {
        if (isOpen && currentlyReading.length > 0) setSelectedBook(currentlyReading[0]);
        setStartPage(currentlyReading[0]?.current_page ?? 0);
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    const handleClose = () => {
        setEndPage(null);
        setStartPage(selectedBook?.current_page ?? 0);
        setQuote("");
        onClose();
    }

    if (!currentlyReading) return null

    const totalPages = selectedBook?.page_count_override ?? selectedBook?.page_count ?? '';
    const cover = selectedBook?.cover_override ?? selectedBook?.cover ?? '';
    const title = selectedBook?.title_override ?? selectedBook?.title ?? '';
    const author = selectedBook?.author_override ?? selectedBook?.author ?? '';

    return ( 
        <>
        { isOpen && 
            (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-60 flex justify-center items-center" id="sessionModal">
                    <div className='bg-surface-opaque m-auto min-h-lg min-w-3xl rounded-b-lg border-edge p-6'>
                        <div className="flex flex-row justify-between items-center mt-2 border-b-edge">
                            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Reading Log</h4>
                            <div><X className="hover:text-amber-500 transform duration-300" onClick={handleClose} /></div>
                        </div>
                        <h1 className="text-textlight font-serif text-2xl">Log a Session</h1>
                        <select className="mb-10 border-b w-full p-4" onChange={(e) => { 
                            const book = currentlyReading.find(
                                b => b.user_books_uid === e.target.value
                            );
                            setSelectedBook(book);
                            setStartPage(book?.current_page ?? 0);
                            setEndPage(null);
                        }}>
                            { currentlyReading.map((book, index) => (
                                <option value={book.user_books_uid} key={`option-${book.user_books_uid}`}>
                                    {book.title_override ? book.title_override : book.title}&nbsp;by&nbsp;
                                    {book.author_override ? book.author_override : book.author} 
                                </option>
                            ))}
                        </select>

                        <div className="flex flex-row mt-2">   
                            { cover ? (
                                <div className="w-24 shrink-0">
                                    <img src={cover} />
                                </div>
                            ) : (
                                <div className="flex flex-col justify-between bg-teal-600 h-36 w-24 shrink-0 p-2 text-center">
                                    <div className="flex text-textlight border-b border-teal-700 uppercase text-wrap">{ title }</div>
                                    <div className="flex items-baseline text-textlight text-xs">{ author }</div>
                                </div>
                            )}                

                            <div className="ml-5 flex flex-col flex-1">
                                <form id="session-form" onSubmit={async (e) => {
                                    e.preventDefault();
                                    const res = await fetch('/api/books_log', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ userBooksuid: selectedBook.user_books_uid, startPage, endPage, quote })
                                    });
                                    if (res.ok) {
                                        refresh();
                                        router.refresh();
                                    }
                                    handleClose();
                                }}>
                                    <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Book Details</h4>
                                    <h1 className="font-serif text-2xl">{title}</h1>
                                    <h3 className="mt-1 text-muted text-xs uppercase">{author} &middot; { totalPages } pages total</h3>
                                    <div className="mt-6 flex flex-row w-full justify-between">
                                        <div className="flex flex-col">
                                            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Last Stopped At Page {selectedBook?.current_page} of {selectedBook?.page_count}</h4>
                                            <input type="number" id="startPage" name="startPage" className="p-6 mt-2 min-w-12 text-2xl outline-1 outline-edge" value={startPage} 
                                            key={selectedBook?.user_books_uid} placeholder={`${selectedBook?.current_page}`} required onChange={(e) => setStartPage(Number(e.target.value))} 
                                            />
                                        </div>
                                        <div className="flex flex-col ml-5">
                                            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Stopping this session at page</h4>
                                            <input type="number" id="endPage" name="endPage" className="p-6 mt-2 min-w-12 text-2xl outline-1 outline-edge" value={endPage ?? ''} placeholder={`${selectedBook?.current_page}`} min={selectedBook?.current_page} required onChange={(e) => setEndPage(Number(e.target.value))} />
                                        </div>
                                    </div>
                                
                                    
                                    <div className="mt-6 flex flex-row w-full justify-between">
                                        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Quote</h4>
                                        <h4 className="text-muted font-sans tracking-wider-than-widest text-textsmall mb-2">Optional</h4>
                                    </div>
                                    <input type="text" name="quote" className="p-6 mt-2 w-full text-2xl outline-1 outline-edge" value={quote} placeholder="To be or not to be..." onChange={(e) => setQuote(e.target.value)}/>

                                </form>
                            </div>
                        </div>

                        <div className="flex flex-row w-full border-t mt-6 p-4 justify-between">
                            <h4 className="mt-2 text-textlight font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Logging <span className="text-amber-500">{todayString}</span> &middot; Session for <span className="text-amber-500">{ pagesRead }</span>&nbsp;pages</h4>

                            <div>
                                <button className="mr-5 bg-surface-opaque text-s border border-muted align-middle text-muted px-5 py-3 hover:bg-zinc-800 rounded-4xl cursor-pointer transition-colors duration:300" onClick={handleClose}>Cancel</button>
                                <button type="submit" className="bg-amber-500 text-s align-middle text-textdark px-5 py-3 hover:bg-amber-400 rounded-4xl cursor-pointer transition-colors duration:300" form="session-form">
                                    + Log Session
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )       
        }
        </>
    )
}

export default SessionModal;