'use client';
import { useRouter } from 'next/navigation';

const BooksPage = () => {
    const router = useRouter();
    return (
        <div>
            <h1>Hello from the Books Page</h1>
            <a className="text-amber-500 cursor-pointer" onClick={() => router.replace("/")}>Go Home</a>
        </div>
    )
};

export default BooksPage;