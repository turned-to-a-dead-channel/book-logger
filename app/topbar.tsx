"use client";
import { useState, useEffect } from 'react';
import Image from "next/image"
import { CircleStar } from 'lucide-react';
import { useModal } from "@/context/modalcontext";
import { useRouter } from 'next/navigation';

const TopBar = ( { todayString } : { todayString: string }) => {
    const { activeModal, setActiveModal } = useModal();
    const [dateString, setDateString] = useState('');
    const router = useRouter();

    useEffect(() => { setDateString(todayString) }, []);
    
    return (
        <>
            <nav className="fixed w-full z-50 border-b border-edge bg-background/50 backdrop-blur-md flex">
                <div className="flex flex-row justify-between w-full items-center">
                    <div className='m-5 flex items-center'>
                        <div className="rounded-full overflow-hidden inline-flex w-10 h-10">
                            <Image className="inline cursor-pointer" src="/stillroom.png" alt="description" width={64} height={64} onClick={() => router.replace("/")} />
                        </div>
                        <div className="cursor-pointer" onClick={() => router.replace("/")} >
                            <span className="ml-5 mt-2 font-serif align-middle text-textlight text-3xl">The </span> 
                            <span className="mt-2 font-serif align-middle text-amber-500 text-3xl">&nbsp;Still </span> 
                            <span className="mt-2 font-serif align-middle text-textlight text-3xl">&nbsp;Room</span> 
                            <span className="mt-2 ml-5 align-middle font-mono uppercase tracking-wider-than-widest text-xs text-muted">A Place for Preservation &middot; { dateString }</span>
                        </div>
                    </div>
                    <div className="m-5 flex flex-row">
                        <button onClick={() => setActiveModal("addBook")} className="bg-teal-600 text-xs align-middle text-textdark px-4 py-2 hover:bg-teal-500 rounded-4xl cursor-pointer transition-colors duration:300 mr-5">
                            + Add Book
                        </button>
                        <button onClick={() => setActiveModal("logSession")} className="bg-amber-500 text-xs align-middle text-textdark px-4 py-2 hover:bg-amber-400 rounded-4xl cursor-pointer transition-colors duration:300">
                            + Log Session
                        </button>
                        <CircleStar className="h-8 w-8 ml-5 hover:text-amber-400 transition-colors duration-300" />
                    </div>
                </div>
            </nav>
        </>
    )
};

export default TopBar;