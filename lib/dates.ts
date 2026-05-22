const today = new Date();
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);

export const dates = {
    todayRaw: today,
    todayString: today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    currMonthString: today.toLocaleDateString('en-US', { month: 'long' }),
    currMonthNumeric: today.toLocaleDateString('en-US', { month: 'numeric' }),
    lastMonthString: lastMonth.toLocaleDateString('en-US', { month: 'long'}),
    lastMonthNumeric: lastMonth.toLocaleDateString('en-US', { month: 'numeric'}),
    currYearNumeric: today.toLocaleDateString('en-US', { year: 'numeric' }),
    prevYearNumeric: lastYear.toLocaleDateString('en-US', { year: 'numeric' })
}