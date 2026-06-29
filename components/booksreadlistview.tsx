import { BooksThisYearData } from "@/lib/types";
import { getRandomColor, bgColors, borderColors } from "@/lib/colors";

interface BooksReadListViewProps {
    data: any[];
    sortKey: string;
    sortDir: 'asc' | 'desc';
    onSort: (key: string) => void;
}

const BooksReadListView = ({ data, sortKey, sortDir, onSort }: BooksReadListViewProps) => {
    return (  
        <table className="w-full m-5 [&_td]:px-4 [&_td]:py-2 [&_th]:px-4 [&_th]:py-2">
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th className={`${sortKey === "title" ? 'text-amber-500' : 'text-white'} cursor-pointer text-left`} onClick={() => onSort('title')}>
                        Title {sortKey === 'title' && (sortDir === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className={`${sortKey === "author" ? 'text-amber-500' : 'text-white'} cursor-pointer text-left1`} onClick={() => onSort('author')}>
                        Author {sortKey === 'author' && (sortDir === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className={`${sortKey === "page_count" ? 'text-amber-500' : 'text-white'} cursor-pointer`} onClick={() => onSort('page_count')}>
                        Pages {sortKey === 'page_count' && (sortDir === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className={`${sortKey === "date_finished" ? 'text-amber-500' : 'text-white'} cursor-pointer`} onClick={() => onSort('date_finished')}>
                        Date Finished {sortKey === 'date_finished' && (sortDir === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className={`${sortKey === "rating" ? 'text-amber-500' : 'text-white'} cursor-pointer`} onClick={() => onSort('rating')}>
                        Rating {sortKey === 'rating' && (sortDir === 'asc' ? '↑' : '↓')}
                    </th>
                </tr>
            </thead>
            <tbody>

            { data.map((book, index) => (
                <tr key={`book-${book.book_id}`} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>  
                    <td>{index + 1}</td>
                    <td>
                        <div className="flex items-center gap-3">
                            {book.cover || book.cover_override ? 
                                <img src={`${book.cover_override? book.cover_override : book.cover}`} className="w-10 h-14 object-cover inline mr-3" /> : 
                                <div className={`w-10 h-14 ${getRandomColor(bgColors)} overflow-hidden inline-block mr-3`}></div>
                            }
                            { book.title_override ? book.title_override : book.title }
                        </div>
                    </td>
                    <td>{ book.author_override ? book.author_override : book.author }</td>
                    <td className="text-center">{ book.page_count_override ? book.page_count_override : book.page_count }</td>
                    <td className="text-left">{book.date_finished ? new Date(book.date_finished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
                    <td className="text-center">{ book.rating ? book.rating : "No rating"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default BooksReadListView;