import { BooksThisYearData } from "@/lib/types";
import { getRandomColor, bgColors, borderColors } from "@/lib/colors";

interface BooksReadCoverViewProps {
    data: any[];
    sortKey: string;
    sortDir: 'asc' | 'desc';
    onSort: (key: string) => void;
}

const BooksReadCoverView = ({ data, sortKey, sortDir, onSort }: BooksReadCoverViewProps) =>  {
    return (
        <h1>Hello from the cover view</h1>
    )
}

export default BooksReadCoverView;