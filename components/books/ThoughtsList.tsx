"use client";
import { BookInfoData } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from 'lucide-react';

const ThoughtsList = ({ data } : { data: BookInfoData }) => {
    const [addThought, setAddThought] = useState(false);
    const [thought, setThought] = useState('');
    const [pageRef, setPageRef] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingThought, setEditingThought] = useState("");
    const router = useRouter();

    const userBooksuid = data.user_books_uid;

    const handleClose = () => {
        setThought('');
        setPageRef('');
        setAddThought(false);
        setEditingThought("");
    }

    const thoughtForm = ( 
        <div className="mt-3 border border-edge p-5 rounded-md">
            <form onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                if (editingThought !== "") {
                    const res = await fetch(`../api/thoughts/${editingThought}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ uid: editingThought, thought, pageRef })
                    });
                    if (res.ok) {
                        router.refresh();
                        handleClose();
                    }
                } else {
                    const res = await fetch('../api/thoughts/', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ userBooksuid, thought, pageRef })
                    });
                    if (res.ok) {
                        router.refresh();
                        handleClose();
                    }
                }

                setIsSubmitting(false);
            }} >
                <textarea 
                    value={thought} 
                    placeholder="What are you thinking?"
                    onChange={(e) => setThought(e.target.value)} 
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
                        { isSubmitting && editingThought ? "Updating...": isSubmitting && !editingThought ? "Adding..." : editingThought ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    )

    return (
        <div className="mt-10">
            <h1 className="text-3xl font-serif text-textlight border-b border-edge mb-2">Thoughts</h1>
                {
                    data.thoughts ? 
                        <div className="mb-1">
                            {
                                data.thoughts.map((bookThought, index) => 
                                (
                                    editingThought === bookThought.books_thoughts_uid ? 
                                        <div key={`${bookThought.books_thoughts_uid}`}>
                                            { thoughtForm }
                                        </div> 
                                    :
                                        <div className="group flex flex-row" key={`${bookThought.books_thoughts_uid}`}>
                                            <div className="mt-2 w-4/5 font-mono text-lg text-muted group">
                                                {bookThought.thought}

                                                {bookThought.page && (<span className="ml-1 text-xs">{`(${bookThought.page})`}</span>)}
                                            </div>

                                            <div className="flex flex-row justify-end items-center w-1/5">
                                                <Pencil className="cursor-pointer opacity-0 h-6 w-6 text-muted group-hover:opacity-100 hover:text-amber-500 transform duration-300" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setThought(bookThought.thought);
                                                    setPageRef(bookThought.page ? bookThought.page : "");
                                                    setEditingThought(bookThought.books_thoughts_uid);
                                                }} />

                                                <Trash2 className="ml-3 cursor-pointer opacity-0 h-6 w-6 text-muted group-hover:opacity-100 hover:text-amber-500 transform duration-300" onClick={async (e) => {
                                                    e.preventDefault();
                                                    if (!window.confirm('Delete this thought?')) return;
                                                    const res = await fetch(`../api/thoughts/${bookThought.books_thoughts_uid}`, {
                                                        method: 'DELETE',
                                                        headers: {'Content-Type': 'application/json'},
                                                        body: JSON.stringify({ thoughtuid: bookThought.books_thoughts_uid })
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

                            {
                                !addThought ? 

                                    <button className="mt-5 cursor-pointer border border-dashed border-muted text-sm uppercase w-1/4 text-muted p-2 font-mono tracking-wider-than-widest hover:border-solid hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/10 transform duration-300" onClick={() => setAddThought(true)}>
                                        Add Thought
                                    </button> 
                                : 
                                    thoughtForm
                            }
                        </div> 
                    : !addThought ? 
                        <button className="mt-3 cursor-pointer border border-dashed border-muted text-sm uppercase w-full text-muted p-5 font-mono tracking-wider-than-widest hover:border-solid hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/10 transform duration-300" onClick={() => setAddThought(true)}>
                            + Add First Thought
                        </button> 

                    :
                        thoughtForm
                       
                }
        </div>
    )
}

export default ThoughtsList;