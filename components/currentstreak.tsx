import { BookData } from "@/lib/types";

const CurrentStreak = ({ data } : { data : BookData }) => {
    const { currentStreak, bestStreak, bestStreakMonth, bestStreakYear } = data;

    return (
        <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Current Streak</h4>
            <div className="mt-5 ml-5 flex flex-row items-center">
                <span className="text-5xl text-textlight font-serif">{ currentStreak }</span>
                <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;days</span>
            </div>
            <div className="flex flex-row mt-5">
                <span className="font-mono text-xs text-muted">
                    Best 
                </span>
                <span className="font-mono text-xs text-amber">
                    &nbsp;{ bestStreak } days 
                </span>
                <span className="font-mono text-xs text-muted">
                    &nbsp;&middot;&nbsp;{ bestStreakMonth }&nbsp;{ bestStreakYear } 
                </span>
            </div>
        </div>
    )
}

export default CurrentStreak;