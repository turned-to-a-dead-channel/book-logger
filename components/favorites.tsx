"use client";
import { getRandomColor, bgColors } from "@/lib/colors";

const FavoritesPanel = ({ data } : { data: any[] }) => {
    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64">
          <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall h-6">Highly Rated Books</h4>
          <h1 className="font-serif mt-2 pb-7 text-2xl text-textlight">Favorites</h1>
          { data.length > 0 ? 
            <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4 mt-5">
                {
                    data.map((book, index) => (
                        <div key={`favorites-${index}`}>
                            { book.cover || book.cover_override ? 
                            <img src={book.cover_override ? book.cover_override : book.cover} className="w-full aspect-2/3 object-fill" /> : 
                            <div className={`flex flex-col min-h-48 w-full p-2 text-center ${getRandomColor(bgColors)}`}>
                                <div className={`flex text-xs text-textlight border-b uppercase text-wrap pb-2`}>{ book.title }</div>
                                <div className="flex items-baseline text-textlight text-xs text-left">{ book.author }</div>
                            </div>
                            }
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