"use client"

// types.ts
interface DayData {
  date: Date;
  count?: number;
  isToday?: boolean;
  hasData?: boolean;
}

interface Book {
  id: string;
  title: string;
  cover: string;
}

interface CalendarData {
  [key: string]: Book[]; // date string -> array of books
}

import { useMemo } from 'react';
import { dates } from '@/lib/dates';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';

const CalendarPanel = ({ data }: { data: CalendarData }) => {
    const monthStart = startOfMonth(dates.todayRaw);
    const monthEnd = endOfMonth(dates.todayRaw);

    const datesForCalendar = useMemo(() => {
        const allDays = eachDayOfInterval({start: monthStart, end: monthEnd});
        const startOffset = getDay(monthStart);

        return { allDays, startOffset };

    }, [monthStart, monthEnd]);

    return (
        <div className="p-2 pt-8 rounded-lg">
            <div className="grid grid-cols-7 gap-2 w-full auto-rows-fr">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className='text-muted text-sm text-center pb-4'>
                        {day}
                    </div>
                ))}  
            </div> 
            <div className="grid grid-cols-7 gap-2 w-full auto-rows-fr">

                {Array.from({length: datesForCalendar.startOffset}).map((_, i) =>( 
                    <div key={`empty-${i}`} className="relative rounded-sm"></div>
                ))}

                { datesForCalendar.allDays.map(date => {
                    const dateKey = format(date, 'yyyy-MM-dd');
                    const dayBooks = data[dateKey] || []; // array of books for this day
                    const isToday = isSameDay(date, dates.todayRaw);
                    const hasData = dayBooks.length > 0;
                    
                    return (
                        <div key={dateKey} className="relative w-full pl-2 pr-2 pb-[10%] bg-surface border border-edge">
                            <span className="text-gray-400 text-sm ml-0.5">
                                {format(date, 'd')}
                            </span>
                        
                            {hasData && (
                                <div className="grid grid-cols-2 gap-0.5 mt-auto mb-auto flex-1 min-h-0">
                                    {dayBooks.slice(0, 4).map(book => (
                                        <img 
                                        key={book.id}
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-full aspect-2/3 object-cover rounded-sm"
                                        />
                                    ))}
                                </div>
                            )}

                        
                            { dayBooks.length > 4 && (
                                <span className="absolute bottom-1 right-1 text-xs bg-emerald px-1 rounded">
                                    +{dayBooks.length - 4}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
} 



export default CalendarPanel;