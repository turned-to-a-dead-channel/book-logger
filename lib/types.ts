export interface BookData {
  readBooks: number,
  goalBooks: number,
  readBooksCurrMonth: number,
  readBooksLastMonth: number, 
  pagesThisYear : number,
  pagesLastYear : number,
  thirtyDayAvg : number,
  currentStreak?: number,
  bestStreak?: number,
  bestStreakMonth?: string,
  bestStreakYear?: number,
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
}

export interface CalendarData {
  [key: string]: Book[]; // date string -> array of books
}

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
}
