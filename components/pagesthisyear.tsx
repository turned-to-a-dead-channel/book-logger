import { dates } from "@/lib/dates";

export interface MonthData {
    month: string,
    pages?: number,
    status?: "completed" | "upcoming" | "current"
}

export const PagesThisYear = ({ data }: { data: MonthData[] }) => {    
    const maxPages = Math.max(...data.map(d => d.pages ?? 0));
    const MAX_HEIGHT_PX = 200;
    const MIN_HEIGHT_PERCENT = 10;

    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
            <div className='flex flex-row'>
                <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">2026 &middot; Monthly Overview in Pages</h4>
            </div>
            <div>
                <h1 className="font-serif mt-2 pb-7 text-2xl text-textlight">Pages this Year</h1>
                <div className="mt-6 flex w-full">
                    <div className="flex flex-row justify-between gap-4 w-full">
                        {data.map(({ month, pages, status }) => {
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
                        })}
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
