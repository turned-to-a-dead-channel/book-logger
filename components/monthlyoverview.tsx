"use client"
import { useState } from 'react';
import { MonthData } from '@/lib/types';

const MonthlyOverview = ({ data }: { data: MonthData[] }) => {    
    const [selected, setSelected] = useState("books")
    const maxPages = Math.max(...data.map(d => d.pages ?? 0));
    const maxBooks = Math.max(...data.map(d => d.books ?? 0));
    const MAX_HEIGHT_PX = 200;
    const MIN_HEIGHT_PERCENT = 10;

    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64">
            <div className='flex flex-row justify-between'>
                <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall h-6">2026 &middot; Monthly Overview in Numbers</h4>
                <div className="flex flex-row gap-1">
                    <span className={`${selected === "books" ? "text-amber-500" : "text-muted" } text-textsmall uppercase cursor-pointer`} onClick={() => setSelected("books")}>Books</span>
                    <span className="text-muted text-textsmall uppercase">|</span>
                    <span className={`${selected === "pages" ? "text-amber-500" : "text-muted" } text-textsmall uppercase cursor-pointer`} onClick={() => setSelected("pages")}>Pages</span>
                </div>
            </div>
            <div>
                <h1 className="font-serif mt-2 pb-7 text-2xl text-textlight">Year By Month</h1>
                <div className="mt-6 flex w-full">
                    <div className="flex flex-row justify-between gap-4 w-full">
                        { selected === "pages" ? 
                            data.map(({ month, pages, status }) => {
                                let height;
                                pages ? height = pages / maxPages * 100 : height = 0;

                                return (
                                    <div key={month} className="flex-1 flex flex-col items-center">
                                        <div className="flex items-end w-full" style={{ height: `${MAX_HEIGHT_PX}px`}}>
                                            <div title={`${pages} pages`} className={`w-full ${ status === "current" ? "bg-amber-500" : pages == maxPages ? "bg-teal-800" : status == "completed" ? "bg-teal-600" : "bg-surface border border-edge" } mb-1`} style={{ height: `${ pages == 0 ? MIN_HEIGHT_PERCENT : height}%` }}></div>
                                        </div>
                                        <span className="text-xs items-center text-muted uppercase">{month}</span>
                                    </div>
                                )
                            }) :
                            data.map(({ month, books, status }) => {
                                let height;
                                books ? height = books / maxBooks * 100 : height = 0;

                                return (
                                    <div key={month} className="flex-1 flex flex-col items-center group">
                                        <div className="flex items-end w-full" style={{ height: `${MAX_HEIGHT_PX}px`}}>
                                            <div title={`${books} books`} className={`w-full ${ status === "current" ? "bg-amber-500" : books == maxBooks ? "bg-teal-800" : status == "completed" ? "bg-teal-600" : "bg-surface border border-edge" } mb-1`} style={{ height: `${ books == 0 ? MIN_HEIGHT_PERCENT : height}%` }}></div>
                                        </div>
                                        <span className="text-xs items-center text-muted uppercase group-hover:text-amber-500 transform duration-300">{month}</span>
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </div>
                <div className="flex flex-row mt-8">
                    <div className="flex flex-row items-center">
                        <div className="flex-1 w-4 h-4 bg-teal-600"></div>
                        <div className="ml-1 text-muted text-xs uppercase">&nbsp;Past</div>
                    </div>

                    <div className="flex flex-row ml-5 items-center">
                        <div className="flex-1 w-4 h-4 bg-amber-500"></div>
                        <div className="ml-1 text-muted text-xs uppercase">&nbsp;Current</div>
                    </div>

                    <div className="flex flex-row ml-5 items-center">
                        <div className="flex-1 w-4 h-4 bg-surface border border-edge"></div>
                        <div className="ml-1 text-muted text-xs uppercase">&nbsp;Upcoming</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyOverview;