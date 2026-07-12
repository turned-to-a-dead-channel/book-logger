"use client";
import { BookInfoData } from "@/lib/types";
import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LogsList = ({ data } : { data: BookInfoData })=> {   
    const [editingLog, setEditingLog] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const router = useRouter();

    // today's date in the format date inputs expect
    const today = format(new Date(), 'yyyy-MM-dd');

    // last log's end page (assuming logs are ordered oldest→newest)
    const lastEndPage = data.logs?.[data.logs.length - 1]?.end_page;

    const [startPage, setStartPage] = useState<number | undefined>(lastEndPage);
    const [endPage, setEndPage] = useState(lastEndPage);
    const [dateLogged, setDateLogged] = useState(today);

    const handleClose = () => {
        setIsAdding(false);
        setIsFinished(false);
        setEditingLog('');
        setStartPage(lastEndPage);
        setEndPage(lastEndPage);
        setDateLogged(today);
    }

    {/* ***** BADGES ****************************************************************************** */}
    const began = ( 
        <div className="border border-emerald-500 rounded-full w-fit text-xs text-emerald-500 uppercase px-4 py-2">Began</div>
    )
    const session = ( 
        <div className="border border-amber-500 rounded-full w-fit text-xs text-amber-500 uppercase px-4 py-2">Ongoing</div>
    )
    const finished = ( 
        <div className="border border-rose-500 rounded-full w-fit text-xs text-rose-500 uppercase px-4 py-2">Finished</div>
    )

    const LogForm = (
        <form onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);

            if (editingLog !== "") {
                const res = await fetch(`../api/books_log/log/${editingLog}`, {
                    method: 'PATCH', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ uid: editingLog, dateLogged, startPage, endPage, isFinished})
                })
                
                if (res.ok) {
                    router.refresh();
                    handleClose();
                }
            } else {
                const res = await fetch(`../api/books_log/`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ userBooksuid: data.user_books_uid, dateLogged, startPage, endPage, quote: null, isFinished })
                })

                if (res.ok) {
                    router.refresh();
                    handleClose();
                }
            }
            
            setIsSubmitting(false);
        }}>
            <div className="mt-5 border border-edge p-5 rounded-md ">
                <div className="flex flex-row justify-between items-center">
                    <label className="flex flex-col gap-2 font-mono tracking-wider-than-widest text-muted uppercase text-xs pb-2">
                        Date Logged
                        <input 
                            type='date'
                            defaultValue={today}
                            className="w-full text-muted font-sans border border-edge rounded-md p-2"
                            name='date_logged' 
                            onChange={(e) => setDateLogged(e.target.value)} 
                        />
                    </label>

                    <label className="flex flex-col gap-2 font-mono tracking-wider-than-widest text-muted uppercase text-xs pb-2">
                    Start Page
                        <input 
                            type='number' 
                            defaultValue={lastEndPage}
                            className="w-full text-muted font-sans border border-edge rounded-md p-2"
                            name='start_page' 
                            onChange={(e) => setStartPage(e.target.valueAsNumber)} 
                        />
                    </label>

                    <label className="flex flex-col gap-2 font-mono tracking-wider-than-widest text-muted uppercase text-xs pb-2">
                        End Page
                        <input 
                            type='number' 
                            defaultValue={lastEndPage}
                            className="w-full text-muted font-sans border border-edge rounded-md p-2"
                            name='end_page' 
                            onChange={(e) => setEndPage(e.target.valueAsNumber)} 
                        />
                    </label>

                    <div className="flex flex-col gap-1">
                        <span className="text-xs">&nbsp;</span>
                        <button
                            type='button'
                            onClick={() => setIsFinished(prev => !prev)}
                            className={`px-4 py-2 rounded-full text-xs uppercase border transition duration-200 
                                ${isFinished 
                                    ? 'border-emerald-500 text-emerald-500' 
                                    : 'border-edge text-muted'
                                }`}
                        >
                            I'm finished
                        </button>
                    </div>
                </div>
                <div className="mt-5 flex flex-row justify-end">
                    <button className="border border-edge rounded-md px-4 text-muted py-2 mr-5 hover:text-gray-200 hover:border-muted transform duration-300" type="button" onClick={() => handleClose()}>Cancel</button>
                    <button className="mr-5 px-6 py-2 rounded-md bg-amber-500 text-textdark hover:bg-amber-400 transform duration-300" type="submit" disabled={isSubmitting}>
                        { isSubmitting && editingLog ? "Updating...": isSubmitting && !editingLog ? "Logging..." : editingLog ? "Update" : "Log"}
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className="mt-10">
            <h1 className="text-3xl font-serif text-textlight border-b border-edge mb-2">Logs</h1>                
                {    
                data.logs ? 
                    (
                        <>
                            {
                            data.logs.map((log: any, index: number) => (
                                editingLog === log.books_logs_uid 
                                ? 
                                    <div key={`${log.books_logs_uid}`}>
                                        { LogForm }
                                    </div> 
                                :
                                    <div key={log.books_logs_uid} className="group grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 mb-4 w-full items-center">
                                        <div className="font-sans text-muted uppercase mr-10">
                                            {format(new Date(log.date_logged + 'T12:00:00'), 'MMMM d, y')}
                                        </div>
                                        <div className="text-muted text-md mr-10">
                                            page {log.start_page} - {log.end_page} 
                                        </div>
                                        <div>
                                            { log.date_logged === data.date_started?.toLocaleDateString("en-ca") ? began : log.date_logged === data.date_finished?.toLocaleDateString("en-ca") ? finished : session}
                                        </div>
                                        <div className="text-amber-500 text-md mr-10">
                                            +{log.end_page - log.start_page} 
                                            <span className='text-xs text-muted'>&nbsp;pages</span>
                                        </div>
                                        <div className='flex flex-row text-muted justify-end'>
                                            <Pencil 
                                                className='mr-3 opacity-0 hover:text-amber-500 transition duration-200 w-6 h-6 group-hover:opacity-100'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDateLogged(log.date_logged);
                                                    setStartPage(log.start_page);
                                                    setEndPage(log.end_page);
                                                    setEditingLog(log.books_logs_uid);
                                                }}
                                            />
                                            <Trash2 
                                                className='w-6 h-6 opacity-0 hover:text-amber-500 transition duration-200 group-hover:opacity-100' 
                                                onClick = {async (e) => {
                                                    e.preventDefault();
                                                    if (!window.confirm('Delete this log?')) return;
                                                    const res = await fetch(`../api/books_log/log/${log.books_logs_uid}`, {
                                                        method: 'DELETE',
                                                        headers: {'Content-Type': 'application/json'},
                                                        body: JSON.stringify({ uid: log.books_logs_uid })
                                                    });
                                                    if (res.ok) {
                                                        router.refresh();
                                                    }
                                                    handleClose();
                                                }}
                                            />
                                        </div>
                                    </div>
                            ))}
                    
                            { (data.status === "currently reading" && !isAdding) ? (
                                <button className="mt-5 mb-5 cursor-pointer border border-dashed border-muted text-sm uppercase w-1/4 text-muted p-2 font-mono tracking-wider-than-widest hover:border-solid hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/10 transform duration-300" onClick={(e) => {
                                    e.preventDefault();
                                    setIsAdding(true);
                                }}>
                                    { isSubmitting && editingLog ? "Updating...": isSubmitting && !editingLog ? "Adding..." : editingLog ? "Update" : "Add Log"}
                                </button>  
                            ) : 

                            (data.status === "currently reading" && isAdding) && 
                                LogForm
                            }                
                        </>
                    )   
                :
                <div className="text-center text-xs text-muted font-mono tracking-wider-than-widest uppercase mt-2">No logs yet</div>
                }
        </div>
    )
}

export default LogsList;