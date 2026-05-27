"use client";
import { useState, useEffect } from "react";
import { dates } from "@/lib/dates";

export interface BookData {
    title: string,
    author: string,
    status: "to read" | "currently reading" | "completed",
    currentPage?: number,
    totalPages: number,
    publisher?: string
    pubDate?: number,
    cover?: string,
    beginDate?: Date,
    completedDate?: Date,
    subtitle?: string,
    quotes?: string[]
}

export const CurrentlyReading = ({ data } : { data: BookData[] }) => {
    const { author, title, cover, currentPage, totalPages, quotes, beginDate } = data[0];
    const [randomQuote, setRandomQuote] = useState<string | undefined>(undefined);
    let daysSince;

    useEffect(() => {
        if (quotes) {
            setRandomQuote(quotes.length > 1 ? quotes[Math.floor(Math.random() * quotes.length)] : quotes[0]);
        }
    }, []);

    if (beginDate) {
        daysSince = Math.floor((dates.todayRaw.getTime() - new Date(beginDate!).getTime()) / (1000 * 60 * 60 * 24));
    }

    return (
        <div>
            <h1 className="font-serif text-2xl text-textlight mt-2 pb-7">In Progress</h1>

            <div className="flex flex-row">
                <div className="flex">
                    <div className="w-24 shrink-0">
                        <img src={cover} />
                    </div>
                </div>
                <div className="flex flex-col w-full ml-5">
                    <h1 className="font-serif text-4xl text-textlight">{ title }</h1>
                    <span className="text-sm uppercase font-mono text-muted">{ author } &middot; { totalPages } pages</span>

                    {randomQuote && 
                        (
                            <div className="border-l-2 border-l-teal-600 pl-3 mt-5 mb-5">
                                { randomQuote }
                            </div>
                        )
                    }

                    <div className='w-full flex flex-col items-baseline mt-auto'>
                        <div className="w-full border border-edge bg-surface h-2">
                            <div 
                                className="h-full bg-amber-500 rounded-full" 
                                style={{ width: `${(currentPage! / totalPages) * 100}%` }}
                            />
                        </div>
                        <div className="w-full flex flex-row font-mono text-muted text-xs mt-2 justify-between">
                            <div className="flex">
                                <span className="text-amber-500">p. { currentPage }</span>
                                &nbsp;
                                <span className="text-muted">of { totalPages }</span>
                            </div>


                            <div className='flex'>
                                { currentPage && (Math.round((currentPage / totalPages) * 100)) + "%"}

                                { daysSince ? ` \u00B7 Began ${daysSince}d ago` : " \u00B7 No start date set" }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}