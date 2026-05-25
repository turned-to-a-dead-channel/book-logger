import { dates } from "@/lib/dates";
import { BookData } from "@/lib/types";
import { ChevronUp, ChevronDown, Equal } from 'lucide-react';


const PagesThisYearStat = ({ data } : { data: BookData }) => {
    const { pagesLastYear, pagesThisYear } = data; 
    const yearToYearDiff = pagesThisYear - pagesLastYear;
    const yearToYearComp = Math.round(yearToYearDiff / pagesLastYear * 100);

    return (
         <div>
            <div className="mt-5 ml-5 flex flex-row items-center">
                <span className="text-5xl text-textlight font-serif">{ pagesThisYear.toLocaleString('en-US') }</span>
                <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;Year to Date</span>
            </div>
            <div className="flex flex-row mt-5">
                {yearToYearComp > 0 ? <ChevronUp className="w-4 h-4 text-emerald" /> : yearToYearComp < 0 ? <ChevronDown className="w-4 h-4 text-oxblood" /> : <Equal className="w-4 h-4 text-amber" />}

                <span className={`font-mono text-xs ${yearToYearComp > 0 ? "text-emerald" : yearToYearComp < 0 ? "text-oxblood" : "text-amber" }`}>
                    &nbsp;{ yearToYearComp }%&nbsp;
                </span>

                <span className="text-xs text-muted"> 
                    compared to { dates.prevYearNumeric } 
                </span>
            </div>
        </div>
    )
}

export default PagesThisYearStat;