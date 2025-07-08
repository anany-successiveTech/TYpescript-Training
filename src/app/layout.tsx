"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@/component/SideBar'
import '@/app/styles/body.css'
import { ThemeContext, ThemeProvider } from "@/context/ThemeProvider";
import { ReactNode, useContext } from "react";
import { CountProvider } from "@/context/CountProvider";
import NavbarDrawer from "@/component/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Body = ({ children }:{children:ReactNode}) => {
  const { theme } = useContext(ThemeContext);
  console.log(theme);
  return <body className={theme}>{children}</body>;
};

export default function RootLayout({ children }:{children:ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <ThemeProvider>
        <Body
         
        >
          <CountProvider>
            {/* <Navbar /> */}
            <NavbarDrawer/>
            {/* <Sidebar/> */}
            <div className="app-layout">
              <main className="main-content home-body">{children}</main>
            </div>
          </CountProvider>
        </Body>
      </ThemeProvider>
    </html>
  );
}
