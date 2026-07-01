import type { Metadata } from "next";
import TopBar from "./topbar";
import Footer from "./footer";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { getDates } from "@/lib/dates";
import { ModalProvider, useModal } from "@/context/modalcontext";
import { BooksProvider, useBooks } from "@/context/bookscontext";
import { UserProvider, useUser } from "@/context/usercontext";
import ModalRenderer from '@/components/modals/modalrenderer';

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "The Still Room",
  description: "My reading space",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { todayString } = getDates(new Date());

  return (
    <html className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="mb-8It">
        <UserProvider>
          <BooksProvider>
            <ModalProvider>
              <TopBar todayString={todayString}></TopBar>
              <main className="pt-28">{children}</main>
              <Footer></Footer>
              <ModalRenderer todayString={todayString} />
            </ModalProvider>
          </BooksProvider>
        </UserProvider>
      </body>
    </html>
  )
}

export default MainLayout;
