"use client";
import { useEffect, useState } from "react";
import { X } from 'lucide-react';
import { ModalProps } from "@/lib/types";


const AddBookModal = ({ isOpen, onClose, userUid }: ModalProps & { userUid: string }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [totalPages, setTotalPages] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    const handleClose = () => {
        setTitle(''); setAuthor(''); setTotalPages(''); setPublicationYear('');
        setPublisher(''); setIsbn(''); setCoverUrl(''); setStatus('');
        onClose();
    }

    return (
        <>
            { isOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-60 flex justify-center items-center" id="sessionModal">
                        <div className='bg-surface-opaque m-auto min-h-lg min-w-3xl rounded-b-lg border-edge p-6'>
                            <div className="flex flex-row justify-between items-center mt-2 border-b-edge">
                                <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">New Entry</h4>
                                <div><X className="hover:text-amber-500 transform duration-300" onClick={handleClose} /></div>
                            </div>
                            <h1 className="text-textlight font-serif text-2xl">Add a Book</h1>
                            <div className="ml-5 flex flex-col flex-1">
                                <form id="add-book-form" autoComplete="off" onSubmit={async (e) => {
                                    e.preventDefault();
                                    await fetch('/api/books', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ userUid, title, author, totalPages, publicationYear, publisher, isbn, coverUrl, status })
                                    });
                                    handleClose();
                                }}>

                                    <input name="title" id="title" type="text" placeholder="Enter the title" className="w-full outline-1 outline-edge mt-2 mb-2 p-2 text-s" required value={title} onChange={e => setTitle(e.target.value)} />

                                    <input name="author" id="author" type="text" placeholder="Enter the author" className="w-full outline-1 outline-edge mt-2 mb-2 p-2 text-s" required value={author} onChange={e => setAuthor(e.target.value)} />

                                    <input name="publisher" id="publisher" type="text" placeholder="Publisher" className="w-full outline-1 outline-edge mt-2 mb-2 p-2 text-s" value={publisher} onChange={e => setPublisher(e.target.value)} />

                                    <div className="flex flex-row">
                                        <input name="totalPages" id="totalPages" type="number" required placeholder="Total pages" className="flex-1 outline-1 outline-edge mt-2 mb-2 p-2 text-s" value={totalPages} onChange={e => setTotalPages(e.target.value)} />

                                        <input name="publicationYear" id="publicationYear" className="flex-1 outline-1 outline-edge mt-2 mb-2 p-2 ml-2 text-s" type="number" placeholder="Year Published" value={publicationYear} onChange={e => setPublicationYear(e.target.value)} />

                                        <input name="isbn" id="isbn" type="text" placeholder="ISBN" className="flex-2 outline-1 outline-edge mt-2 mb-2 p-2 ml-2 text-s" value={isbn} onChange={e => setIsbn(e.target.value)} />
                                    </div>


                                    <input name="coverUrl" id="coverUrl" type="text" placeholder="Cover url" className="w-full outline-1 outline-edge mt-2 mb-2 p-2 text-s" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} />

                                    <div className="flex flex-row justify-between mt-2">
                                        <div>
                                            <input type="radio" id="currentlyReading" name="status" className="p-2" value="currently reading" checked={status === 'currently reading'} onChange={e => setStatus(e.target.value)} />
                                            <label htmlFor="currentlyReading">Currently Reading</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="toRead" name="status" value="to read" className="p-2 ml-2" checked={status === 'to read'} onChange={e => setStatus(e.target.value)} />
                                            <label htmlFor="toRead">To Read</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="finished" name="status" value="finished" className="p-2" checked={status === 'finished'} onChange={e => setStatus(e.target.value)} />
                                            <label htmlFor="finished">Finished</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="didNotFinish" name="status" value="did not finish" className="p-2 ml-2" checked={status === 'did not finish'} onChange={e => setStatus(e.target.value)} />
                                            <label htmlFor="didNotFinish">Did Not Finish</label>
                                        </div>
                                    </div>

                                    <div className="flex flex-row w-full border-t mt-6 p-4 justify-between">
                                        <h4 className="mt-2 text-textlight font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Adding <span className="text-amber-500">{title}</span></h4>
                                        <div>
                                            <button className="mr-5 bg-surface-opaque text-s border border-muted align-middle text-muted px-5 py-3 hover:bg-zinc-800 rounded-4xl cursor-pointer transition-colors duration:300" onClick={handleClose}>Cancel</button>
                                            <button type="submit" className="bg-amber-500 text-s align-middle text-textdark px-5 py-3 hover:bg-amber-400 rounded-4xl cursor-pointer transition-colors duration:300" form="add-book-form">
                                                Add Book
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )

            }
        </>
    )
}

export default AddBookModal;