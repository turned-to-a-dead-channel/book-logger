import type { Metadata } from "next";
import TopBar from "./topbar";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
  return (
    <html className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="mb-8">
        <TopBar></TopBar>
        <main className="pt-32">{children}</main>
      </body>
    </html>
  )
}

export default MainLayout;
