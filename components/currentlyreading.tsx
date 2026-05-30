"use client";
import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { dates } from "@/lib/dates";


interface BookQuote {
  books_quotes_id: number
  books_quotes_uid: string
  ub_id: number
  quote: string
  page_number?: number
}
export interface BookData {
    title: string,
    title_override?: string,
    author: string,
    author_override?: string,
    status: "to read" | "currently reading" | "completed",
    current_page?: number,
    page_count: number,
    page_count_override: number
    publisher?: string
    pubDate?: number,
    date_started?: Date,
    date_finished?: Date,
    subtitle?: string,
    quotes?: BookQuote[],
    cover?: string,
    cover_override?: string
}

export const CurrentlyReading = ({ data } : { data: BookData[] }) => {
    const [randomQuote, setRandomQuote] = useState<string | undefined>(undefined);
    const [selectedIndex, setSelectedIndex] = useState(0)

    const books = data?.[selectedIndex];

    useEffect(() => {
        setRandomQuote(undefined);
        const quotes = books?.quotes;
        if (quotes) {
            setRandomQuote(quotes.length > 1 ? quotes[Math.floor(Math.random() * quotes.length)].quote : quotes[0].quote);
        }
    }, [books]);

    if (!books) return null

    let daysSince;

    if (books.date_started) {
        daysSince = Math.floor((dates.todayRaw.getTime() - new Date(books.date_started!).getTime()) / (1000 * 60 * 60 * 24));
    }

    const totalPages = books.page_count_override ?? books.page_count;
    const cover = books.cover_override ?? books.cover;
    const title = books.title_override ?? books.title;
    const author = books.author_override ?? books.author;

    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64">
                <div className="flex flex-row justify-between">
                    <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Currently Reading</h4>
                    <div className='flex flex-row'>
                    { data.map((b, index) => (
                        index === selectedIndex
                            ? <BookmarkCheck key={`currently-reading-${index}`} onClick={() => setSelectedIndex(index)} className="text-textsmall cursor-pointer text-amber-500 ml-2" />
                            : <Bookmark key={`currently-reading-${index}`} onClick={() => setSelectedIndex(index)} className="text-textsmall cursor-pointer text-muted ml-2" />
                    ))}
                    </div>
                </div>
                <h1 className="font-serif text-2xl text-textlight mt-2 pb-7">In Progress</h1>

                <div className="flex flex-row">
                    <div className="flex h-full">
                        { cover ? (
                            <div className="w-24 shrink-0">
                                <img src={cover} />
                            </div>
                        ) : (
                            <div className="flex flex-col justify-between bg-teal-600 min-h-36 w-24 shrink-0 p-2 text-center">
                                <div className="flex text-textlight border-b border-teal-700 uppercase text-wrap">{ title }</div>
                                <div className="flex items-baseline text-textlight text-xs">{ author }</div>
                            </div>
                        )}
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
                                    style={{ width: `${(books.current_page! / totalPages) * 100}%` }}
                                />
                            </div>
                            <div className="w-full flex flex-row font-mono text-muted text-xs mt-2 justify-between">
                                <div className="flex">
                                    <span className="text-amber-500">p. { books.current_page }</span>
                                    &nbsp;
                                    <span className="text-muted">of { totalPages }</span>
                                </div>


                                <div className='flex'>
                                    { books.current_page && (Math.round((books.current_page / totalPages) * 100)) + "%"}

                                    { daysSince ? ` \u00B7 Began ${daysSince}d ago` : " \u00B7 No start date set" }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}