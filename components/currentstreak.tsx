import { BookData } from "@/lib/types";

const CurrentStreak = ({ data } : { data : BookData }) => {
    const { currentStreak, bestStreak, bestStreakMonth, bestStreakYear } = data;

    return (
        <div>
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