"use client"
import { PagesData } from "@/lib/types";

const DailyAverageStat = ({ data } : { data : PagesData }) => {
    return (    
        <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Daily Average</h4>
            <div className="mt-5 ml-5 flex flex-row items-center">
                <span className="text-5xl text-textlight font-serif">{ data.pagesThisMonth ? Math.round(data.pagesThisMonth/30) : 0 }</span>
                <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;Pages Per Day</span>
            </div>
            <div className="flex flex-row mt-5">


                <span className="font-mono text-xs text-amber-500">
                    = 
                </span>
                <span className="font-mono text-xs text-muted">
                    &nbsp;30 Day Rolling
                </span>
            </div>
        </div>
    )
}

export default DailyAverageStat;