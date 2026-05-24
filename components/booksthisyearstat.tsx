import { dates } from '@/lib/dates';
import { ChevronUp, ChevronDown, Equal } from 'lucide-react';

interface BookData {
  readBooks: number,
  goalBooks: number,
  readBooksCurrMonth: number,
  readBooksLastMonth: number, 
}


const BooksThisYear = ({ data } : { data: BookData } ) => {
    const { readBooks, goalBooks, readBooksCurrMonth, readBooksLastMonth } = data;
    const readBooksDiffMonth = readBooksCurrMonth - readBooksLastMonth; 

    return (
        <div>
            <div className="mt-5 ml-5 flex flex-row items-center">
            <span className="text-5xl text-textlight font-serif">{ readBooks }</span>
            <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;of { goalBooks } goal</span>
            </div>
            <div className="flex flex-row mt-5">
            {readBooksDiffMonth > 0 ? <ChevronUp className="w-4 h-4 text-emerald" /> : readBooksDiffMonth < 0 ? <ChevronDown className="w-4 h-4 text-oxblood" /> : <Equal className="w-4 h-4 text-amber" />}
            <span className={`font-mono text-xs ${readBooksDiffMonth > 0 ? "text-emerald" : readBooksDiffMonth < 0 ? "text-oxblood" : "text-amber" }`}>
                &nbsp;{ readBooksDiffMonth }&nbsp;
            </span>
                <span className="text-xs text-muted"> 
                vs { dates.lastMonthString } { dates.currYearNumeric } &middot; { Math.floor((readBooks / goalBooks) * 100)}% of goal
            </span>
            </div>
        </div>
    )
}

export default BooksThisYear;