"use client"
import { CalendarData } from '@/lib/types';
import { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';

const CalendarPanel = ({ data }: { data: CalendarData }) => {
    const today = useMemo(() => new Date(), []);
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    const datesForCalendar = useMemo(() => {
        const allDays = eachDayOfInterval({start: monthStart, end: monthEnd});
        const startOffset = (getDay(monthStart) + 6) % 7; // adjusted for Monday start

        return { allDays, startOffset };

    }, [monthStart, monthEnd]);

    return (
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1 min-w-64">
            <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall h-6">
                This Month Overview
            </h4>
            <h1 className="font-serif mt-2 pb-7 text-2xl text-textlight">
                {format(today, "MMMM")} {format(today, "y")}
            </h1>
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
                        const isToday = isSameDay(date, today);
                        const hasData = dayBooks.length > 0;
                        
                        return (
                            <div key={dateKey} className={`relative w-full pl-2 pr-2 pb-[10%] border ${ isToday ? "border-amber-600 bg-amber-500" : hasData ? "border-teal-800 bg-teal-700" : "border-edge" }`}>
                                <span className={`text-sm ml-0.5 ${ hasData || isToday ? "text-textlight" : "text-muted"}`}>
                                    {format(date, 'd')}
                                </span>
                            
                                {/* If day has books logged, display up to 4 covers in the date square */}
                                {hasData && (
                                    <div className="grid grid-cols-2 gap-0.5 mt-auto mb-auto flex-1 min-h-0">
                                        {dayBooks.slice(0, 4).map(book => (
                                            <img 
                                            key={`${dateKey}-${book.id}`}
                                            src={book.cover}
                                            title={book.title}
                                            alt={book.title}
                                            className="w-full aspect-2/3 object-cover rounded-sm"
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Display a badge if day contains more than 4 books */}
                                { dayBooks.length > 4 && (
                                    <span className="absolute bottom-1 right-1 text-xs bg-oxblood px-1 rounded">
                                        +{dayBooks.length - 4}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
} 

export default CalendarPanel;