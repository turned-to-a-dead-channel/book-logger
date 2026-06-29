"use client";
import { useState, useEffect } from 'react';
import Image from "next/image"
import { CircleStar } from 'lucide-react';
import { dates } from "@/lib/dates";
import { useModal } from "@/context/modalcontext";
import { useRouter } from 'next/navigation';

const Footer = () => {
    const [quotes, setQuotes] = useState<any[]>([])

    useEffect(() => {
        fetch('/api/quotes')
            .then(res => res.json())
            .then(data => {
                setQuotes(data)
            })
    }, []);

    const getRandomFooterQuote = (quotes: any[]) => {
        return quotes[(Math.floor(Math.random() * quotes.length))];
    }

    const quote = getRandomFooterQuote(quotes) 

    return (
        <footer className="mt-10 bg-black/50 border-t border-edge">
            { 
                quote && 
                (
                    <div className="text-center pb-10">
                        <div className="font-serif text-4xl mt-10 pt-10 text-amber-500">
                            &ldquo;
                        </div>
                        <div className='font-serif text-white text-2xl max-w-[60%] mx-auto'>
                            {quote.quote}
                        </div>
                        <div className="font-serif text-4xl pt-5 text-amber-500">
                            &rdquo;
                            </div>
                        <div className='font-mono text-md text-muted max-w-[60%] mx-auto'>  
                            { quote.author } { quote.book && (<> &middot; {quote.book}</>) }
                        </div>
                    </div>
                )            
            }
        </footer>
    )
}

export default Footer;