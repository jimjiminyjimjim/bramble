import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Libre_Franklin } from "next/font/google";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-franklin",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={`min-h-screen bg-white ${libreFranklin.variable}`}>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      <body className="min-h-screen flex flex-col justify-center bg-white">
        {children}
      </body>
    </html>
  );
}
