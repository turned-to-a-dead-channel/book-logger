"use client";
import { getRandomColor, bgColors } from "@/lib/colors";
import { BookInfoData } from "@/lib/types";

const ToRead = ({ data } : {data : BookInfoData[]} ) => {
    console.log(data);
    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Up next: In Progress</h4>
            <h1 className="font-serif mt-2 pb-7 text-2xl text-textlight">Up Next</h1>
            { data.length > 0 ? 
                <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4 mt-5">
                    {
                        data.map((book, index) => (
                            <div key={`toread-${index}`}>
                                { book.cover || book.cover_override ? 
                                <img src={book.cover_override ? book.cover_override : book.cover} className="w-full aspect-2/3 object-fill" /> : 
                                <div className={`flex flex-col min-h-60 w-full p-2 text-center ${bgColors[index % bgColors.length]}`}>
                                    <div className={`flex text-xs text-textlight border-b uppercase text-wrap pb-2`}>{ book.title }</div>
                                    <div className="flex text-textlight text-xs text-left mt-auto">{ book.author }</div>
                                </div>
                                }

                                <div className="mt-2 font-serif text-md text-textlight">
                                    {book.title}
                                </div>

                                <div className="mt-2 font-serif text-sm text-muted uppercase">
                                    {book.author}
                                </div>

                                { book.priority && (
                                    <div style={{ color: book.prioritycolor }}
                                    className={`mt-2 rounded-full border max-w-1/3 p-1 uppercase text-xs text-center font-mono`}>
                                        {book.priority}
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div> :
                <h1>No "to read" books yet</h1>
            }
        </div>
    )        
}

export default ToRead;