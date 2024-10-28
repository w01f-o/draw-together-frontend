import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import { FC, ReactNode } from "react";
import RootProvider from "@/libs/Providers/RootProvider";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Draw together!",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body
        className={clsx(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <NextTopLoader showSpinner={false} />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
