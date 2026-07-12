"use client";
import { BookInfoData } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from 'lucide-react';

const QuotesList = ({ data } : { data: BookInfoData }) => {
    const [addQuote, setAddQuote] = useState(false);
    const [quote, setQuote] = useState('');
    const [pageRef, setPageRef] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingQuote, setEditingQuote] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();

    const userBooksuid = data.user_books_uid;
    const pageSize = 3;
    const paginated = data.quotes?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) ?? [];
    const numOfPages = Math.ceil((data.quotes?.length ?? 0) / pageSize);    
    const numOfPagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

    const handleClose = () => {
        setQuote('');
        setPageRef('');
        setAddQuote(false);
        setEditingQuote("");
    }

    const quoteForm = ( 
        <div className="mt-3 mb-10 border border-edge p-5 rounded-md">
            <form onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);

                if (editingQuote !== "") {
                    const res = await fetch(`../api/quotes/${editingQuote}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ uid: editingQuote, quote, pageRef })
                    });
                    if (res.ok) {
                        router.refresh();
                        handleClose();
                    }
                } else {
                    const res = await fetch('../api/quotes/', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ userBooksuid, quote, pageRef })
                    });
                    if (res.ok) {
                        router.refresh();
                        handleClose();
                    }
                }
            
                setIsSubmitting(false);
            }} >
                <textarea 
                    value={quote} 
                    placeholder="Quote you'd like to preserve..."
                    onChange={(e) => setQuote(e.target.value)} 
                    className="w-full h-24 resize-none text-muted font-sans border border-edge rounded-md p-2"
                    required 
                />
                <input
                    value={pageRef}
                    onChange={(e) => setPageRef(e.target.value)}
                    placeholder="Page reference (optional)"
                    className="w-1/4 text-muted font-sans p-2 mt-2 border border-edge rounded-md"
                />
                <div className="mt-5 flex flex-row justify-end">
                    <button className="border border-edge rounded-md px-4 text-muted py-2 mr-5 hover:text-gray-200 hover:border-muted transform duration-300" type="button" onClick={() => handleClose()}>Cancel</button>
                    <button className="mr-5 px-6 py-2 rounded-md bg-amber-500 text-textdark hover:bg-amber-400 transform duration-300" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Adding...": "Add" }
                    </button>
                </div>
            </form>
        </div>
    )

    return (
        <div className="mt-10">
            <h1 className="text-3xl font-serif text-textlight border-b border-edge mb-3">Quotes</h1>
                {
                    data.quotes ? 
                        <div className="mb-1">
                            {
                                paginated.map((bookQuote, index) => (
                                    editingQuote === bookQuote.books_quotes_uid ?
                                    
                                        <div key={`${bookQuote.books_quotes_uid}`}>
                                            { quoteForm }
                                        </div> 
                                    :
                                        <div className="group flex flex-row" key={`${bookQuote.books_quotes_uid}`}>
                                            <div className={`mt-6 font-serif text-xl text-textlight mx-auto w-4/5 pb-6 tracking-wide ${index < (paginated.length - 1) && 'border-b border-edge'}`}>
                                                <span className="text-amber-500">&ldquo;&nbsp;</span>
                                                {bookQuote.quote}
                                                <span className="text-amber-500">&nbsp;&rdquo;</span>
                                            
                                                {bookQuote.page && (<span className="ml-1 text-xs">{`(${bookQuote.page})`}</span>)}
                                            </div>

                                            <div className="flex flex-row justify-end items-center">
                                                <Pencil className="cursor-pointer opacity-0 h-6 w-6 text-muted group-hover:opacity-100 hover:text-amber-500 transform duration-300" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setQuote(bookQuote.quote);
                                                    setPageRef(bookQuote.page ? bookQuote.page : "");
                                                    setEditingQuote(bookQuote.books_quotes_uid);
                                                }} />

                                                <Trash2 className="ml-3 cursor-pointer opacity-0 h-6 w-6 text-muted group-hover:opacity-100 hover:text-amber-500 transform duration-300" onClick={async (e) => {
                                                    e.preventDefault();
                                                    if (!window.confirm('Delete this quote?')) return;
                                                    const res = await fetch(`../api/quotes/${bookQuote.books_quotes_uid}`, {
                                                        method: 'DELETE',
                                                        headers: {'Content-Type': 'application/json'},
                                                        body: JSON.stringify({ quoteuid: bookQuote.books_quotes_uid })
                                                    });
                                                    if (res.ok) {
                                                        router.refresh();
                                                    }
                                                    handleClose();
                                                }}/>
                                            </div>
                                        </div>
                                ))
                            }
                            
                            { data.quotes.length > pageSize &&
                                <div className="text-md text-muted flex flex-row justify-end">
                                    {numOfPagesArr.map((page, index) => (
                                        <div key={`page-${numOfPagesArr[index]}`} className={`cursor-pointer ${currentPage + 1 === numOfPagesArr[index] && 'text-amber-500'} hover:text-amber-400 transform duration-300 ml-5`} onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(numOfPagesArr[index] - 1);

                                        }}>
                                            {numOfPagesArr[index]}
                                        </div>
                                    ))}
                                </div>
                            }
                            

                            {
                                !addQuote ? 

                                    <button className="mt-5 cursor-pointer border border-dashed border-muted text-sm uppercase w-1/4 text-muted p-2 font-mono tracking-wider-than-widest hover:border-solid hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/10 transform duration-300" onClick={() => setAddQuote(true)}>
                                        Add Quote
                                    </button> 
                                : 
                                    quoteForm
                            }
                        </div> 
                    : !addQuote ? 
                        <button className="mt-3 cursor-pointer border border-dashed border-muted text-sm uppercase w-full text-muted p-5 font-mono tracking-wider-than-widest hover:border-solid hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/10 transform duration-300" onClick={() => setAddQuote(true)}>
                            + Add First Quote
                        </button> 

                    :
                        quoteForm
                }
        </div>
    )
}

export default QuotesList;