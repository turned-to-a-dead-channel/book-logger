"use client";
import { BookInfoData } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ThoughtsList = ({ data } : { data: BookInfoData }) => {
    const [addThought, setAddThought] = useState(false);
    const [thought, setThought] = useState('');
    const [pageRef, setPageRef] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const userBooksuid = data.user_books_uid;

    const handleClose = () => {
        setThought('');
        setPageRef('');
        setAddThought(false);
    }

    console.log(data); 

    return (
        <div className="mt-10">
            <h1 className="text-3xl font-serif text-textlight border-b border-edge mb-2">Thoughts</h1>
                {
                !addThought ? 
                    data.thoughts ? 
                        <div className="mb-1">
                            {
                                data.thoughts.map((bookThought, index) => (
                                    <div key={bookThought.books_thoughts_uid} className="mt-2 w-4/5 font-mono text-lg text-muted">
                                        {bookThought.thought}

                                        {bookThought.page && (<span className="ml-1 text-xs">{`(${bookThought.page})`}</span>)}
                                    </div>
                                ))
                            }

                            <button className="mt-5 cursor-pointer border border-dashed border-muted text-sm uppercase w-1/4 text-muted p-2 font-mono tracking-wider-than-widest hover:border-solid hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/10 transform duration-300" onClick={() => setAddThought(true)}>
                                Add Thought
                            </button>
                        </div> :
                        <button className="mt-3 cursor-pointer border border-dashed border-muted text-sm uppercase w-full text-muted p-5 font-mono tracking-wider-than-widest hover:border-solid hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/10 transform duration-300" onClick={() => setAddThought(true)}>
                            + Add First Thought
                        </button> :
                        <div className="mt-3 border border-edge p-5 rounded-md">
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                setIsSubmitting(true);
                                const res = await fetch('../api/thoughts', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({ userBooksuid, thought, pageRef })
                                });
                                if (res.ok) {
                                    router.refresh();
                                }
                                handleClose();
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
                                    <button className="border border-edge rounded-md px-4 text-muted py-2 mr-5 hover:text-gray-200 hover:border-muted transform duration-300" onClick={() => handleClose()}>Cancel</button>
                                    <button className="mr-5 px-6 py-2 rounded-md bg-amber-500 text-textdark hover:bg-amber-400 transform duration-300" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Adding...": "Add" }
                                    </button>
                                </div>
                            </form>
                        </div>
                }
        </div>
    )
}

export default ThoughtsList;