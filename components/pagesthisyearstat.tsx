import { dates } from "@/lib/dates";
import { PagesData } from "@/lib/types";
import { ChevronUp, ChevronDown, Equal } from 'lucide-react';


const PagesThisYearStat = ({ data } : { data: PagesData }) => {
    const { pagesLastYear, pagesThisYear } = data; 
    const yearToYearDiff = (!pagesThisYear && !pagesLastYear) ? 0
    : !pagesLastYear ? pagesThisYear
    : !pagesThisYear ? -pagesLastYear
    : pagesThisYear - pagesLastYear
    const yearToYearComp = pagesLastYear ? Math.round(yearToYearDiff / pagesLastYear * 100) : 0;

    return (
         <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Pages This Year</h4>
            <div className="mt-5 ml-5 flex flex-row items-center">
                <span className="text-5xl text-textlight font-serif">{ pagesThisYear ? pagesThisYear.toLocaleString('en-US') : 0 }</span>
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