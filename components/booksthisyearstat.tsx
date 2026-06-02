import { useState, useEffect } from "react";
import { dates } from '@/lib/dates';
import { BooksThisYearData } from "@/lib/types";
import { ChevronUp, ChevronDown, Equal } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BooksThisYear = ({ data } : { data: BooksThisYearData } ) => {
    const router = useRouter();
    const [selected, setSelected] = useState("month")
    const [lastMonthLabel, setLastMonthLabel] = useState("")
    const [currYearLabel, setCurrYearLabel] = useState("")

    useEffect(() => {
        setLastMonthLabel(dates.lastMonthString)
        setCurrYearLabel(dates.currYearNumeric)
    }, [])
    
    const { finishedReading, finishedThisYear, finishedByThisTimeLastYear, finishedThisMonth, finishedLastMonth, goalBooks } = data;
    const readBooksDiffMonth = finishedThisMonth.length - finishedLastMonth.length;

    return (
        <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
            <div className="flex flex-row items-start justify-between">
                <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall" onClick={() => router.replace("/books")}>Books Read</h4>
                <div className="flex flex-row gap-1">
                    <span className={`${selected === "month" ? "text-amber-500" : "text-muted" } text-textsmall uppercase cursor-pointer`} onClick={() => setSelected("month")}>Month</span>
                    <span className="text-muted text-textsmall uppercase">|</span>
                    <span className={`${selected === "year" ? "text-amber-500" : "text-muted" } text-textsmall uppercase cursor-pointer`} onClick={() => setSelected("year")}>Year</span>
                </div>
            </div>
            { selected === "year" ?  
                <div className="mt-5 ml-5 flex flex-row items-center">
                    <span className="text-5xl text-textlight font-serif">{ finishedThisYear.length }</span>  
                    <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;of { goalBooks } goal</span>
                </div> : 
                <div className="mt-5 ml-5 flex flex-row items-center">
                    <span className="text-5xl text-textlight font-serif">{ finishedThisMonth.length }</span>
                    <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;of { Math.round((goalBooks - finishedThisYear.length)/(12 - dates.currMonthRaw)) } goal</span>
                </div> 
            } 
            <div className="flex flex-row mt-5">
                { selected === "year" ? 
                    <span className="text-xs text-muted"> 
                        { Math.floor((finishedThisYear.length / goalBooks) * 100)}% of goal&nbsp;&middot;&nbsp;
                    </span> :
                    <span className="text-xs text-muted"> 
                        { Math.floor((finishedThisMonth.length / Math.round((goalBooks - finishedThisYear.length)/(12 - dates.currMonthRaw))) * 100)}% of goal&nbsp;&middot;&nbsp;
                    </span>
                }

                {readBooksDiffMonth > 0 ? <ChevronUp className="w-4 h-4 text-emerald-500" /> : readBooksDiffMonth < 0 ? <ChevronDown className="w-4 h-4 text-oxblood" /> : <Equal className="w-4 h-4 text-amber-500" />}
                <span className={`font-mono text-xs ${readBooksDiffMonth > 0 ? "text-emerald-500" : readBooksDiffMonth < 0 ? "text-oxblood" : "text-amber-500" }`}>
                   { readBooksDiffMonth }&nbsp;
                </span>
                <span className="text-xs text-muted">
                    vs { lastMonthLabel } { currYearLabel }
                </span>
                {/*
                <span className="text-xs text-muted">
                    vs { dates.lastMonthString } { dates.currYearNumeric } &middot; { Math.floor((finishedThisYear.length / goalBooks) * 100)}% of goal
                </span>
                */}
            </div>
        </div>
    )
}

export default BooksThisYear;