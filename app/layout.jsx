import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taxi2Go Sydney | Airport & City Taxis, Book Online Now",
  description: "Book a Sydney taxi in minutes with Taxi2Go. Fixed prices, safe & clean vehicles, 24/7 airport transfers, corporate & city rides. Book online now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Tawk.to */}
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function(){
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/697f7cb430a29f1c35f1cfb4/1jgcvu987';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-27MCQJP50M" />
    </html>
  );
}
