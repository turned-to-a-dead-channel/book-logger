/* ***** IMPORT STATS ***************************************************************************** */
import PagesThisYearStat from '@/components/stats/pagesthisyearstat';
import BooksThisYear from '@/components/stats/booksthisyearstat';
import DailyAverageStat from '@/components/stats/dailyaveragestat';
import CurrentStreak from '@/components/stats/currentstreakstat';
/* ***** IMPORT PANELS **************************************************************************** */
import CalendarPanel from '@/components/calendar';
import ReadingLogPanel from '@/components/readinglogs';
import MonthlyOverview from '@/components/monthlyoverview';
import { CurrentlyReading } from '@/components/currentlyreading';
import FavoritesPanel from '@/components/favorites';
import ToRead from "@/components/toread";
/* ***** IMPORT UTILITIES ************************************************************************* */
import { getDates } from '@/lib/dates';
import { getCurrentlyReading, getToRead } from '@/lib/functions';
import { CalendarData, ReadingLog, MonthData } from '@/lib/types';
import { getBooksByUserUid } from '@/lib/queries/books';
import { getBooksLogs } from '@/lib/queries/bookslog';
import { getUser } from '@/lib/queries/user';
/* ***** IMPORT DEPENDENCIES ************************************************************************* */
import { format } from 'date-fns';


const HomePage = async () => {
  const user = await getUser();
  const books = await getBooksByUserUid(user.user_uid);
  const logs = await getBooksLogs({ userUid: user.user_uid });
  const today = new Date(); // computed once, server-side, no hydration risk

  const goalBooks = user?.goal_books;
  const currentlyReading = getCurrentlyReading(books);
  const toRead = getToRead(books);
  const favorites = books.filter(b => b.is_favorite);
  const displayedFavorites = favorites.length > 0 ? favorites : books.filter(b => b.rating == 5);

  const dates = getDates(today);

  {/* ***** FINISHED LOGIC ************************************************************************ */}
  const finishedReading = books.filter(b => b.status === 'finished');

  const finishedThisYear = books.filter(b => {
    if (!b.date_finished) return false
    return b.status === 'finished' && b.date_finished.getFullYear() === today.getFullYear()
  })

  const finishedByThisTimeLastYear = books.filter(b => {
    if (!b.date_finished) return false
    const finished = new Date(b.date_finished)
    return finished >= new Date(dates.todayRaw.getFullYear() - 1, 0, 1) && finished <= dates.lastYearSameDayRaw
  })

  const finishedLastMonth = books.filter(b => {
    if (!b.date_finished) return false
    const finished = new Date(b.date_finished)
    return finished >= dates.lastMonthStartRaw && finished <= dates.lastMonthEndRaw
  })

  const finishedThisMonth = books.filter(b => {
    if (!b.date_finished) return false
    const finished = new Date(b.date_finished)
    return finished >= dates.currMonthStartRaw && finished <= dates.currMonthEndRaw
  })


  {/* ***** PAGES LOGIC *************************************************************************** */}
  const pagesThisYear = finishedThisYear.reduce((sum, book) => sum + (book.page_count_override ?? book.page_count), 0) + currentlyReading.reduce((sum, book) => sum + (book.current_page ?? 0), 0);
  const pagesThisMonth = finishedThisMonth.reduce((sum, book) => sum + (book.page_count_override ?? book.page_count), 0)
    + currentlyReading.reduce((sum, book) => sum + (book.current_page ?? 0), 0);
  const pagesLastYear = finishedByThisTimeLastYear.reduce((sum, book) => sum + (book.page_count_override ?? book.page_count), 0)
  

  {/* ***** MONTHLY LOGIC ************************************************************************* */}
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currMonthIndex = dates.todayRaw.getMonth();
  const monthlyData: MonthData[] = monthLabels.map((month, i) => {
    const booksThisMonth = finishedThisYear.filter(b => new Date(b.date_finished).getMonth() === i);
    
    const status: "completed" | "current" | "upcoming" = i < currMonthIndex ? "completed" : i === currMonthIndex ? "current" : "upcoming";
    
    return {
      month,
      pages: booksThisMonth.reduce((sum, b) => sum + (b.page_count_override ?? b.page_count), 0),
      books: booksThisMonth.length,
      status,
    };
  });

  {/* ***** LOGS LOGIC *************************************************************************### */}
  function groupLogsByDate(logs: any[]): CalendarData {
    return logs.reduce((acc, log) => {
      const dateKey = format(new Date(log.date_logged), 'yyyy-MM-dd');

      if (!acc[dateKey]) acc[dateKey] = [];

      acc[dateKey].push({
        id: log.books_logs_uid,
        title: log.title_override ?? log.title,
        cover: log.cover_override ?? log.cover,
        ub_uid: log.user_books_uid
      });

      return acc;
    }, {} as CalendarData);
  }

  const calendarData = groupLogsByDate(logs);

  return (
    <div className='ml-5 mr-5 flex flex-col justify-center gap-5'>
      <div className="flex flex-row flex-wrap gap-5 items-stretch justify-center">
        <BooksThisYear 
          data={{ finishedReading, finishedThisYear, finishedByThisTimeLastYear, finishedThisMonth, finishedLastMonth, goalBooks }} lastMonthString={dates.lastMonthString}
          currYearNumeric={dates.currYearNumeric}
          currMonthRaw={dates.currMonthRaw} 
        />
        <PagesThisYearStat data={{ pagesThisYear, pagesLastYear }} prevYearNumeric = { dates.prevYearNumeric } />
        <DailyAverageStat data={{ pagesThisMonth, pagesThisYear }} dayOfTheMonth={dates.dayOfTheMonth} />
        <CurrentStreak data={{currentStreak: 10, bestStreak: 20, bestStreakMonth: "May", bestStreakYear: 2026}} />
      </div>

      <div className="flex flex-row flex-wrap gap-5 items-stretch justify-center">
        <CurrentlyReading data = { currentlyReading } todayRaw = {dates.todayRaw } />
        <MonthlyOverview data= { monthlyData } />
      </div>

      <div className="flex flex-row flex-wrap gap-5 items-stretch justify-center">
        <CalendarPanel data={ calendarData } />
        <FavoritesPanel data = { displayedFavorites } />
      </div>

      {/*
      <div className="flex flex-row flex-wrap gap-5 items-stretch justify-center">
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
          <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">The Shelves: In Progress</h4>
        </div>
        <div className="bg-surface border border-edge rounded-lg p-5 flex-1">
          <h4 className="text-muted font-mono uppercase tracking-wider-than-widest text-textsmall">The Numbers: In Progress</h4>
        </div>
      </div>
      */}
      <div className="flex flex-row flex-wrap gap-5 items-stretch justify-center">
        <ReadingLogPanel data={ logs } />
        <ToRead data={ toRead } />
      </div>
    </div>
)};

export default HomePage;