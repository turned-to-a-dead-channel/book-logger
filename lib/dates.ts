export const getDates = (today : Date) =>  {
    const lastMonth = new Date(today)
    lastMonth.setDate(1);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const lastYear = new Date(today)
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0) // day 0 = last day of this month
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0) // day 0 = last day of previous month

    return {
        todayRaw: today,
        todayString: today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        dayOfTheMonth: today.getDate(),
        currMonthString: today.toLocaleDateString('en-US', { month: 'long' }),
        currMonthNumeric: today.toLocaleDateString('en-US', { month: 'numeric' }),
        currMonthRaw: today.getMonth(),
        currMonthStartRaw: currMonthStart,
        currMonthEndRaw: currMonthEnd,
        lastMonthString: lastMonth.toLocaleDateString('en-US', { month: 'long'}),
        lastMonthNumeric: lastMonth.toLocaleDateString('en-US', { month: 'numeric'}),
        lastMonthRaw: lastMonth,
        currYearNumeric: today.toLocaleDateString('en-US', { year: 'numeric' }),
        prevYearNumeric: lastYear.toLocaleDateString('en-US', { year: 'numeric' }),
        lastYearSameDay: lastYear.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'  }),
        lastYearSameDayRaw: lastYear,
        lastMonthStartRaw: lastMonthStart,
        lastMonthEndRaw: lastMonthEnd
    }
}