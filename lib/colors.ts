export const bgColors = ["bg-teal-600", "bg-emerald-500", "bg-amber-600", "bg-cyan-500", "bg-oxblood", "bg-indigo-600"];
export const borderColors=["border-teal-700", "border-emerald-600", "border-amber-700", "border-cyan-600", "border-indigo-700"]

export const getRandomColor = (colorsArray : string[]) => {
    return colorsArray[(Math.floor(Math.random() * colorsArray.length))];
}