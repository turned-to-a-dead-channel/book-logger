// temporary
export interface StreakData {
  currentStreak?: number,
  bestStreak?: number,
  bestStreakMonth?: string,
  bestStreakYear?: number,
}

interface BookQuote {
  books_quotes_id: number,
  books_quotes_uid: string,
  ub_id: number,
  quote: string,
  page_number?: number
}
export interface BookInfoData {
    title: string,
    title_override?: string,
    author: string,
    author_override?: string,
    status: "to read" | "currently reading" | "completed",
    current_page?: number,
    page_count: number,
    page_count_override: number
    publisher?: string
    pubDate?: number,
    date_started?: Date,
    date_finished?: Date,
    subtitle?: string,
    quotes?: BookQuote[],
    cover?: string,
    cover_override?: string,
    priority?: string,
    priority_order?: number,
    prioritycolor?: string,
    user_books_uid?: string
}

export interface BooksReadListViewData {
    data: any[],
    sortKey: string,
    sortDir: 'asc' | 'desc',
    onSort: (key: string) => void,
}
export interface BooksReadCoverViewData {
    data: any[],
    sortKey: string,
    sortDir: 'asc' | 'desc',
    onSort: (key: string) => void;
}
export interface BooksThisYearData {
  finishedReading: any[],
  finishedThisYear: any[],
  finishedByThisTimeLastYear: any[],
  finishedThisMonth: any[],
  finishedLastMonth: any[],
  goalBooks: number
}

export interface PagesData {
  pagesThisYear: number,
  pagesLastYear?: number,
  pagesThisMonth?: number
}
export interface DayData {
  date: Date;
  count?: number;
  isToday?: boolean;
  hasData?: boolean;
}

export interface Book {
  id: string;
  title: string;
  cover: string;
  ub_uid: string
}

export interface CalendarData {
  [key: string]: Book[]; // date string -> array of books
}
export interface MonthData {
    month: string,
    pages?: number,
    books?: number,
    status?: "completed" | "upcoming" | "current"
}
export interface ReadingLog {
  books_logs_uid: string,
  date_logged: string,
  title: string,
  title_override?: string,
  author: string,
  author_override?: string,
  cover?: string,
  cover_override?: string,
  start_page: number,
  end_page: number,
  user_books_uid: string
}

export type ModalProps = {
  isOpen: boolean,
  onClose: () => void
}

