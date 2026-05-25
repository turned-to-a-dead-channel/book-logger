import { BookData } from "@/lib/types";

const DailyAverageStat = ({ data } : { data : BookData }) => {
    const { thirtyDayAvg } = data;

    return (
        <div>
            <div className="mt-5 ml-5 flex flex-row items-center">
                <span className="text-5xl text-textlight font-serif">{ thirtyDayAvg }</span>
                <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;Pages Per Day</span>
            </div>
            <div className="flex flex-row mt-5">


                <span className="font-mono text-xs text-amber">
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