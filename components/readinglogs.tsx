import { useState } from 'react';
import { dates } from "@/lib/dates";
import { ReadingLog } from '@/lib/types';
import { Pencil, Trash2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';

const ReadingLogPanel = ({ data } : { data: ReadingLog[] }) => {
    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall mb-10">Reading Log: In Progress</h4>
            {
                data.map((log, index) => (
                    <div className="flex flex-row items-center border-b border-edge mb-5 pb-3" key={log.books_logs_uid}>
                        <div className='flex flex-col text-center'>
                            <div className="font-sans text-white">
                                {format(log.date_logged, 'MMM')}
                            </div>
                            <div>
                                {format(log.date_logged, 'd')}
                            </div>
                        </div>
                        <div className="ml-10 flex flex-row w-[80%] items-center">
                            <div>
                                { 
                                    log.cover || log.cover_override ? 
                                    (<img className="h-9 aspect-2/3 object-cover rounded-sm" src={log.cover_override ? log.cover_override : log.cover} />) :
                                    (<div>Book</div>)
                                }                                
                            </div>
                            <div className='ml-5 flex flex-col'>
                                <div className="text-white font-serif text-lg">
                                    {log.title_override ? log.title_override : log.title} 
                                </div>
                                <div className="text-muted font-mono text-xs"> 
                                    {log.author_override ? log.author_override : log.author} 
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mr-5">
                            <div className="text-amber-500 text-md">
                                +{log.end_page - log.start_page} 
                            </div>
                            <div>
                                <span className='text-xs text-muted'>pages</span>
                            </div>
                        </div>
                        <div className='flex flex-row text-muted'>
                            <Pencil className='mr-3 hover:text-amber-500 transition duration-200 w-4 h-4'/>
                            <Trash2 className='w-4 h-4 hover:text-amber-500 transition duration-200' />
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default ReadingLogPanel;