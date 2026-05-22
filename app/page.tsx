import { ChevronUp, ChevronDown, Equal } from 'lucide-react';
import { dates } from '@/lib/dates';
import CalendarPanel from '@/components/calendar';

const readBooks = 39;
const goalBooks = 100;
const readBooksCurrMonth = 10;
const readBooksLastMonth = 10;
const readBooksDiffMonth = readBooksCurrMonth - readBooksLastMonth;
const pagesThisyear = 25000;

const placeholderBookData = {
  "2026-05-03": [
    { id: "1", title: "Eileen", cover: "https://covers.openlibrary.org/b/id/8492671-M.jpg" },
    { id: "2", title: "My Year of Rest and Relaxation", cover: "https://covers.openlibrary.org/b/id/8739105-M.jpg" }
  ],
  "2026-05-04": [
    { id: "1", title: "Eileen", cover: "https://covers.openlibrary.org/b/id/8492671-M.jpg" },
    { id: "2", title: "My Year of Rest and Relaxation", cover: "https://covers.openlibrary.org/b/id/8739105-M.jpg" }
  ],
  "2026-05-08": [
    { id: "1", title: "Eileen", cover: "https://covers.openlibrary.org/b/id/8492671-M.jpg" },
    { id: "3", title: "Death in Her Hands", cover: "https://covers.openlibrary.org/b/id/10387071-M.jpg" },
    { id: "4", title: "Lapvona", cover: "https://covers.openlibrary.org/b/id/12782342-M.jpg" },
    { id: "5", title: "Homesick for Another World", cover: "https://covers.openlibrary.org/b/id/8395750-M.jpg" },
    { id: "6", title: "McGlue", cover: "https://covers.openlibrary.org/b/id/7887822-M.jpg" }
  ]
};

const HomePage = () => {
  return (
  <div className='ml-5 mr-5 flex flex-col justify-items-center gap-5'>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Books This Year</h4>
        <div className="mt-5 ml-5 flex flex-row items-center">
          <span className="text-5xl text-textlight font-serif">{ readBooks }</span>
          <span className="text-muted ml-2 font-mono uppercase text-xs">&nbsp;of { goalBooks } goal</span>
        </div>
        <div className="flex flex-row mt-5">
          {readBooksDiffMonth > 0 ? <ChevronUp className="w-4 h-4 text-emerald" /> : readBooksDiffMonth < 0 ? <ChevronDown className="w-4 h-4 text-oxblood" /> : <Equal className="w-4 h-4 text-amber" />}
          <span className={`font-mono text-xs ${readBooksDiffMonth > 0 ? "text-emerald" : readBooksDiffMonth < 0 ? "text-oxblood" : "text-amber" }`}>
            &nbsp;{ readBooksDiffMonth }&nbsp;
          </span>
            <span className="text-xs text-muted"> 
              vs { dates.lastMonthString } { dates.currYearNumeric } &middot; { Math.floor((readBooks / goalBooks) * 100)}% of goal
          </span>
        </div>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1" >
        <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Pages This Year</h4>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Stats - Daily Average: In Progress</h2>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Stats - Current Streak: In Progress</h2>
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Currently Reading: In Progress</h2>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Pages This Year: In Progress</h2>
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">
          { dates.currMonthString } { dates.currYearNumeric } Overview
        </h2>
        <CalendarPanel data={ placeholderBookData } />
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Favorites: In Progress</h2>
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">The Shelves: In Progress</h2>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">The Numbers: In Progress</h2>
      </div>
    </div>
    <div className="flex flex-row gap-5 items-stretch justify-items-center">
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Reading Log: In Progress</h2>
      </div>
      <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
        <h2 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">Up next: In Progress</h2>
      </div>
    </div>
  </div>
)};

export default HomePage;