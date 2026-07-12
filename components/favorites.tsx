"use client";
import { getRandomColor, bgColors } from "@/lib/colors";
import { getStarType } from "@/lib/functions";
import { Star, StarHalf } from 'lucide-react';
import { useRouter } from "next/navigation";

const FavoritesPanel = ({ data } : { data: any[] }) => {
    const router = useRouter();

    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64">
          <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall h-6">Highly Rated Books</h4>
          <h1 className="font-serif mt-2 pb-7 text-2xl text-textlight">Favorites</h1>
          { data.length > 0 ? 
            <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4">
                {
                    data.map((book, index) => (
                        <div className="mb-4" key={`favorites-${index}`}>
                            { book.cover || book.cover_override ? 
                            <img src={book.cover_override ? book.cover_override : book.cover} className="w-full aspect-2/3 object-fill cursor-pointer" onClick={() => router.push(`/books/${book.user_books_uid}`)} /> : 
                            <div className={`flex flex-col min-h-60 w-full p-2 text-center ${bgColors[index % bgColors.length]}`}>
                                <div className={`flex text-xs text-textlight border-b uppercase text-wrap pb-2`}>{ book.title_override ? book.title_override : book.title }</div>
                                <div className="flex items-baseline text-textlight text-xs text-left">{ book.author_override ? book.author_override : book.author }</div>
                            </div>
                            }

                            <div className="line-clamp-1 truncate mt-2 font-serif text-sm text-textlight">
                                { book.title_override ? book.title_override : book.title }
                            </div>

                            <div className="mt-1 font-serif text-xs text-muted uppercase">
                                { book.author_override ? book.author_override : book.author }
                            </div>

                            <div className="flex flex-row">
                                {[1,2,3,4,5].map(index => {
                                    const type = getStarType(book.rating, index);
                                    return type === 'full' ?
                                        <Star size={16} key={index} className="fill-amber-500 text-amber-500 text-xs" /> : 
                                    type === "half" ?
                                        <StarHalf size={16} key={index} className='fill-amber-500 text-amber-500 text-xs' />
                                    : ""
                                })}
                            </div>
                        </div>
                    ))
                }
            </div> :
            <h1>No favorites yet</h1>
        }
        </div>
    )
}

export default FavoritesPanel;