import ThoughtsList from '@/components/books/ThoughtsList';
import { getBookDetailByUid } from "@/lib/queries/books";
import { badgeStatus } from "@/lib/colors";
import { getStarType } from '@/lib/functions';
import { format } from "date-fns";
import { Pencil, Trash2, Star, StarHalf} from "lucide-react";

const BookPage = async ({ params } : { params: Promise<{ uid: string }> }) => {
    const { uid } = await params;
    const bookDetail = await getBookDetailByUid(uid);
    
    return (
        <div className="m-5 mx-auto max-w-3/5">
            <div className="flex flex-row">
                { 
                bookDetail.cover || bookDetail.cover_override ? 
                    <img className="h-98 aspect-2/3" src={bookDetail.cover_override ? `${bookDetail.cover_override}` : `${bookDetail.cover}`} /> :
                    <div className="h-72">
                        Fill in later
                    </div>
                }

                <div className="ml-10">
                    <h1 className="text-7xl text-textlight font-serif">{ bookDetail.title_override ? bookDetail.title_override : bookDetail.title }</h1>
                    <h3 className="mt-2 text-2xl text-muted font-sans tracking-wider-than-widest uppercase">BY {bookDetail.author_override ? bookDetail.author_override : bookDetail.author}</h3>

                    { 
                        bookDetail.status && 
                        <div className={`mt-5 uppercase mb-5 border rounded-full p-2 max-w-1/4 text-xs text-center ${badgeStatus[bookDetail.status]} ?? 'text-muted'}`}>{ bookDetail.status }</div>
                    }

                    {/* ***** RATINGS DETAILS ***************************************************** */}  
                    <div className="flex flex-row mt-5">
                        { 
                        bookDetail.rating &&
                            [1,2,3,4,5].map(index => {
                                const type = getStarType(bookDetail.rating, index);
                                return type === 'full' ?
                                    <Star size={16} key={index} className="fill-amber-500 text-amber-500 text-xs" /> : 
                                type === "half" ?
                                    <StarHalf size={16} key={index} className='fill-amber-500 text-amber-500 text-xs' />
                                : ""
                            })                            
                        }
                    </div>

                    {/* ***** FIRST ROW DETAILS *************************************************** */}
                    <div className="flex flex-row mt-5">
                        <div className="flex flex-col mr-15">
                            <h6 className="text-shadow-2xs
                            tracking-wider-than-widest text-muted">Page Count</h6>
                            <div>
                                { 
                                bookDetail.page_count_override ? bookDetail.page_count_override : bookDetail.page_count 
                                } pages
                            </div>
                        </div>
                        <div className="flex flex-col mr-15">
                            <h6 className="text-2xs tracking-wider-than-widest text-muted">ISBN</h6>
                            <div>
                                { 
                                bookDetail.isbn || bookDetail.isbn_override ? 
                                    bookDetail.isbn_override ? bookDetail.isbn_override : bookDetail.isbn :
                                    'No isbn given'
                                }
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="text-2xs tracking-wider-than-widest text-muted">Publication Year</h6>
                            <div>
                                { 
                                bookDetail.published_year || bookDetail.published_year_override ? 
                                    bookDetail.published_year_override ? bookDetail.published_year_override : bookDetail.published_year :
                                    'No year given'
                                } 
                            </div>              
                        </div>
                    </div>

                    {/* ***** SECOND ROW DETAILS ************************************************** */}
                    <div className="flex flex-row mt-5">
                        <div className="flex flex-col mr-15">
                            <h6 className="text-2xs tracking-wider-than-widest text-muted">Publisher</h6>
                            <div>
                                { bookDetail.publisher || bookDetail.publisher_override ? 
                                    bookDetail.publisher_override ? bookDetail.publisher_override : bookDetail.publisher :
                                    'No publisher given'
                                }
                            </div>
                        </div>
                    </div>  

                    {/* ***** DATES DETAILS ******************************************************* */}            
                    <div className="flex flex-row mt-5">
                        <div className="flex flex-col mr-15">
                            { 
                            bookDetail.date_started && (
                                <div>
                                    <h6 className="text-2xs tracking-wider-than-widest text-muted">Started</h6>
                                    { format(new Date(bookDetail.date_started), 'MMMM d, y') }
                                </div>
                                )
                            }
                        </div>

                        <div className="flex flex-col mr-15">
                            { 
                            bookDetail.date_finished &&
                                (    
                                    <div>
                                    <h6 className="text-2xs tracking-wider-than-widest text-muted">Finished</h6>
                                    { format(new Date(bookDetail.date_finished), 'MMMM d, y') }
                                    </div>
                                )
                            }
                        </div>
                    </div>  
                </div>
            </div>  
            
            <div>
                {/* ***** REVIEWS ************************************************************* */}
                <div className="mt-10">
                    <h1 className="text-3xl font-serif text-textlight border-b border-edge mb-2">Reviews</h1>
                        {
                        bookDetail.reviews ? 
                            <div className="mb-1">Reviews will go here</div> :
                            <div className="text-center text-xs text-muted font-mono tracking-wider-than-widest uppercase mt-2">No reviews yet</div>
                        }
                </div>

                {/* ***** READING LOGS ******************************************************** */}
                    <div className="mt-10">
                        <h1 className="text-3xl font-serif text-textlight border-b border-edge mb-2">Logs</h1>
                            {    
                            bookDetail.logs ? 
                                bookDetail.logs.map((log: any, index: number) => (
                                    <div key={log.books_logs_uid} className="grid grid-cols-4 gap-4 mb-1 w-full">
                                        <div className="font-sans text-muted uppercase mr-10">
                                            {format(new Date(log.date_logged + 'T12:00:00'), 'MMMM d, y')}
                                        </div>
                                        <div className="text-muted text-md mr-10">
                                            page {log.start_page} - {log.end_page} 
                                        </div>
                                        <div className="text-amber-500 text-md mr-10">
                                            +{log.end_page - log.start_page} 
                                            <span className='text-xs text-muted'>&nbsp;pages</span>
                                        </div>
                                        <div className='flex flex-row text-muted'>
                                            <Pencil className='mr-3 hover:text-amber-500 transition duration-200 w-4 h-4'/>
                                            <Trash2 className='w-4 h-4 hover:text-amber-500 transition duration-200' />
                                        </div>
                                    </div>
                                )) :
                            <div className="text-center text-xs text-muted font-mono tracking-wider-than-widest uppercase mt-2">No logs yet</div>
                            }
                    </div>

                <ThoughtsList data={bookDetail} />

                {/* ***** QUOTES ************************************************************** */}
                <div className="mt-10">
                    <h1 className="text-3xl font-serif text-textlight border-b border-edge mb-5">Quotes</h1>
                        {
                        bookDetail.quotes ? 
                            <div className="mb-6">
                                {
                                    bookDetail.quotes.map((quote: any, index: number) => (
                                        <div className={`mb-10 font-serif text-xl text-textlight mx-auto max-w-4/5 pb-10 tracking-wide ${index < (bookDetail.quotes.length - 1) && 'border-b border-edge'}`} key={`${quote.books_quotes_uid}`}>
                                            <span className="text-amber-500">&ldquo;&nbsp;</span>
                                            {quote.quote}
                                            <span className="text-amber-500">&nbsp;&rdquo;</span>
                                        </div>
                                    ))
                                }
                            </div> :
                            <div className="text-center text-xs text-muted font-mono tracking-wider-than-widest uppercase mt-2">No quotes yet</div>
                        }
                </div>
            </div>
        </div>
    )
}

export default BookPage;