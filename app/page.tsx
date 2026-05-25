import { ChevronUp, ChevronDown, Equal } from 'lucide-react';
import { dates } from '@/lib/dates';
import CalendarPanel from '@/components/calendar';
import BooksThisYear from '@/components/booksthisyearstat';
import { MonthData, PagesThisYear } from '@/components/pagesthisyear';
import { BookData, CurrentlyReading } from '@/components/currentlyreading';
import PagesThisYearStat from '@/components/pagesthisyearstat';
import DailyAverageStat from '@/components/dailyaveragestat';
import CurrentStreak from '@/components/currentstreak';

const placeholderStatData = {
  readBooks: 39,
  goalBooks: 100,
  readBooksCurrMonth: 10,
  readBooksLastMonth: 12,
  pagesThisYear: 2000,
  pagesLastYear: 1500,
  thirtyDayAvg: 50,
  currentStreak: 10,
  bestStreak: 20,
  bestStreakMonth: "October",
  bestStreakYear: 2024
}

const placeholderCurrentlyReading: BookData[] = [
  { title: "Eileen", 
    author: "Ottessa Moshfegh", 
    status: "currently reading", 
    currentPage: 124, 
    totalPages: 250, 
    cover: 'https://covers.openlibrary.org/b/id/0014630300-M.jpg',
    beginDate: new Date("2026-05-22"),
    quotes: [
      "People truly engaged in life have messy houses.", 
      "I couldn't be bothered to deal with fixing things. I preferred to wallow in the problem, dream of better days.",
      "“Here is how I spend my days now. I live in a beautiful place. I sleep in a beautiful bed. I eat beautiful food. I go for walks through beautiful places. I care for people deeply. At night my bed is full of love, because I alone am in it. I cry easily, from pain and pleasure, and I don’t apologize for that. In the mornings I step outside and I’m thankful for another day. It took me many years to arrive at such a life."
    ]
  },
]

const placeholderMonthlyPages: MonthData[] = [
  { month: 'Jan', pages: 842, status: 'completed' },
  { month: 'Feb', pages: 789, status: 'completed' },
  { month: 'Mar', pages: 956, status: 'completed' },
  { month: 'Apr', pages: 903, status: 'completed' },
  { month: 'May', pages: 636, status: 'current' },
  { month: 'Jun', pages: 0, status: 'upcoming' },
  { month: 'Jul', pages: 0, status: 'upcoming' },
  { month: 'Aug', pages: 0, status: 'upcoming' },
  { month: 'Sep', pages: 0, status: 'upcoming' },
  { month: 'Oct', pages: 0, status: 'upcoming' },
  { month: 'Nov', pages: 0, status: 'upcoming' },
  { month: 'Dec', pages: 0, status: 'upcoming' },
];

const placeholderBookData = {
  "2026-05-03": [
    { id: "1", title: "Eileen", cover: "https://covers.openlibrary.org/b/id/0014630300-M.jpg" },
    { id: "2", title: "My Year of Rest and Relaxation", cover: "https://covers.openlibrary.org/b/id/0014605019-M.jpg" }
  ],
  "2026-05-04": [
    { id: "1", title: "Eileen", cover: "https://covers.openlibrary.org/b/id/0014630300-M.jpg" },
    { id: "2", title: "My Year of Rest and Relaxation", cover: "https://covers.openlibrary.org/b/id/0014605019-M.jpg" }
  ],
  "2026-05-08": [
    { id: "1", title: "Eileen", cover: "https://covers.openlibrary.org/b/id/0014630300-M.jpg" },
    { id: "2", title: "McGlue", cover: "https://covers.openlibrary.org/b/id/0008806923-M.jpg" },
    { id: "4", title: "Lapvona", cover: "https://covers.openlibrary.org/b/id/15171235-M.jpg" },
    { id: "5", title: "Homesick for Another World", cover: "https://covers.openlibrary.org/b/id/0008043774-M.jpg" },
    { id: "6", title: "Death in Her Hands", cover: "https://covers.openlibrary.org/b/id/10387071-M.jpg" },
  ],
  "2026-05-23": [
    { id: "1", title: "Eileen", cover: "https://covers.openlibrary.org/b/id/0014630300-M.jpg" },
    { id: "2", title: "My Year of Rest and Relaxation", cover: "https://covers.openlibrary.org/b/id/0014605019-M.jpg" }
  ],
};

const HomePage = () => {
  return (
  <div className='ml-5 mr-5 flex flex-col justify-items-center gap-5'>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Books This Year</h4>
        <BooksThisYear data={ placeholderStatData } />
      </div>
      <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Pages This Year</h4>
        <PagesThisYearStat data={ placeholderStatData } />
      </div>
      <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Daily Average</h4>
        <DailyAverageStat data={ placeholderStatData } />
      </div>
      <div className="relative overflow-hidden bg-surface border border-edge rounded-lg p-5 flex-1 after:content-[''] after:rounded-full after:bg-teal-700 after:absolute after:-bottom-8 after:-right-8 after:p-7 after:h-32 after:w-32 after:blur-md after:opacity-15">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Current Streak</h4>
        <CurrentStreak data={ placeholderStatData } />
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Currently Reading</h4>
        <CurrentlyReading data = { placeholderCurrentlyReading } />
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">2026 &middot; Monthly Overview in Pages</h4>
        <PagesThisYear data= { placeholderMonthlyPages } />
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">
          { dates.currMonthString } { dates.currYearNumeric } Overview
        </h4>
        <CalendarPanel data={ placeholderBookData } />
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Favorites: In Progress</h4>
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">The Shelves: In Progress</h4>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">The Numbers: In Progress</h4>
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Reading Log: In Progress</h4>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Up next: In Progress</h4>
      </div>
    </div>
  </div>
)};

export default HomePage;