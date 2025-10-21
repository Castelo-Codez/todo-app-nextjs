import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import StoreProvider from "./StoreProvider";

const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo App | front end mentor challenges ",
  description: "This application has been built using nextjs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${JosefinSans.className}   bg-light-bg-color  dark:bg-dark-bg-color  min-h-screen  antialiased`}
      >
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
