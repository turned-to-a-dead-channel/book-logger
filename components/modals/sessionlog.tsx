"use client";
import { useEffect } from 'react';
import { ModalProps } from "@/lib/types";
import { X } from 'lucide-react';

const SessionModal = ({ isOpen, onClose, currentlyReading }: ModalProps & { currentlyReading: any[] }) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    return ( 
        <>
        { isOpen && 
            (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-60 flex justify-center items-center" id="sessionModal">
                    <div className='bg-surface m-auto h-lg w-lg rounded-b-lg border-edge p-5'>
                        <div className="flex flex-row justify-between items-center mt-2 border-b-edge">
                            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-2">Reading Log</h4>
                            <div><X className="hover:text-amber-500 transform duration-300" onClick={onClose} /></div>
                        </div>
                        <h1 className="text-textlight font-serif text-2xl">Log a Session</h1>
                    </div>
                    <form>
                        <select>
                            
                        </select>
                    </form>
                </div>
            )       
        }
        </>
    )
}

export default SessionModal;