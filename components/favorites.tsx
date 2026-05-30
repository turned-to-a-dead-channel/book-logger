"use client";
import { getRandomColor, bgColors, borderColors } from "@/lib/colors";

const FavoritesPanel = ({ data } : { data: any[] }) => {
    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64">
          <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Favorites</h4>
          { data.length > 0 ? 
            <div className="flex flex-row flex-wrap gap-4 items-start mt-5">
                {
                    data.map((book, index) => (
                        <div key={`favorites-${index}`}>
                            { book.cover || book.cover_override ? 
                            <img src={book.cover_override ? book.cover_override : book.cover} className="flex-1 h-48 w-32" /> : 
                            <div className={`flex flex-col flex-1 justify-between min-h-48 w-32 shrink-0 p-2 text-center ${getRandomColor(bgColors)}`}>
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