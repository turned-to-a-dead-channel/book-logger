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
  bestStreakYear?: number
}

