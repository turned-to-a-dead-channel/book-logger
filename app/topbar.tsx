import Image from "next/image"
import { dates } from "@/lib/dates";

const TopBar = () => {
    return (
        <nav className="fixed w-full z-50 border-b border-edge bg-background/50 backdrop-blur-md flex">
            <div className="flex flex-row justify-between w-full items-center">
                <div className='m-5 flex items-center'>
                    <div className="rounded-full overflow-hidden inline-flex w-10 h-10">
                        <Image className="inline" src="/stillroom.png" alt="description" width={64} height={64} />
                    </div>
                    <span className="ml-5 mt-2 font-serif align-middle text-textlight text-3xl">The </span> 
                    <span className="mt-2 font-serif align-middle text-amber text-3xl">&nbsp;Still </span> 
                    <span className="mt-2 font-serif align-middle text-textlight text-3xl">&nbsp;Room</span> 
                    <span className="mt-2 ml-5 align-middle font-mono uppercase tracking-wider-than-widest text-xs text-muted">Personal Library &middot; { dates.todayString }</span>
                </div>
                <div className="m-5">
                    <button className="bg-amber text-xs align-middle text-textdark px-4 py-2 hover:bg-amber-2 rounded-4xl cursor-pointer">
                        + Log Session
                    </button>
                </div>
            </div>
        </nav>
    )
};

export default TopBar;