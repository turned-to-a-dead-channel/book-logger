import { dates } from '@/lib/dates';
import { BooksThisYearData } from "@/lib/types";
import { ChevronUp, ChevronDown, Equal } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BooksThisYear = ({ data } : { data: BooksThisYearData } ) => {
    const router = useRouter();
    const { finishedReading, finishedThisYear, finishedByThisTimeLastYear, finishedThisMonth, finishedLastMonth, goalBooks } = data;
    const readBooksDiffMonth = finishedThisMonth.length - finishedLastMonth.length;

    return (
        <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15" onClick={() => router.replace("/books")}>
            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Books This Year</h4>
            <div className="mt-5 ml-5 flex flex-row items-center">
                <span className="text-5xl text-textlight font-serif">{ finishedThisYear.length }</span>
                <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;of { goalBooks } goal</span>
            </div>
            <div className="flex flex-row mt-5">
                {readBooksDiffMonth > 0 ? <ChevronUp className="w-4 h-4 text-emerald" /> : readBooksDiffMonth < 0 ? <ChevronDown className="w-4 h-4 text-oxblood" /> : <Equal className="w-4 h-4 text-amber" />}
                <span className={`font-mono text-xs ${readBooksDiffMonth > 0 ? "text-emerald" : readBooksDiffMonth < 0 ? "text-oxblood" : "text-amber" }`}>
                    &nbsp;{ readBooksDiffMonth }&nbsp;
                </span>
                <span className="text-xs text-muted"> 
                    vs { dates.lastMonthString } { dates.currYearNumeric } &middot; { Math.floor((finishedThisYear.length / goalBooks) * 100)}% of goal
                </span>
            </div>
        </div>
    )
}

export default BooksThisYear;