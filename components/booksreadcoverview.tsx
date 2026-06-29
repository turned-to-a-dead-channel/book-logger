import { getRandomColor, bgColors, borderColors } from "@/lib/colors";
import { Star, StarHalf} from 'lucide-react';

interface BooksReadCoverViewProps {
    data: any[];
    sortKey: string;
    sortDir: 'asc' | 'desc';
    onSort: (key: string) => void;
}

const BooksReadCoverView = ({ data, sortKey, sortDir, onSort }: BooksReadCoverViewProps) =>  {

    const getStarType = (rating: number, position: number) => {
        if (rating >= position) return 'full';
        if (rating >= position - 0.5) return 'half';
        return 'empty';
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {
                data.map((book, index) => (
                    <div key={`book-${book.book_uid}`} className='mb-8'>
                        <div>
                            {
                                book.cover || book.cover_override ? 
                                    <img className="w-48 h-72 shrink-0" src={`${book.cover_override ? book.cover_override : book.cover}`} /> : 
                                
                                    <div className={`${getRandomColor(bgColors)} w-48 h-72 shrink-0 flex flex-col justify-between p-2 pt-4 items-center`}>
                                        <div className="font-serif font-bold  text-center text-s text-textlight border-b uppercase text-wrap pb-2">{book.title_override ? book.title_override : book.title}</div>

                                        <div className="text-center text-xs text-textlight uppercase text-wrap pb-2">{book.author_override ? book.author_override : book.author}</div>
                                    </div>
                            }
                        </div>
                        <div className="text-textlight text-l font-serif font-bold text-wrap mt-2">{book.title_override ? book.title_override : book.title}</div>
                        <div className="text-muted uppercase text-xs">{book.author_override ? book.author_override : book.author}</div>
                        <div className="mt-3">
                            {
                                book.rating ? 
                                    (
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
                                    )

                                    : 

                                    <div className="text-xs text-muted mt-">No Rating</div>
                            }
                        </div>
                    </div>
                ))

            }
        </div>
    )
}

export default BooksReadCoverView;