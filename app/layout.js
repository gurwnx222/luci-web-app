// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Oxygen } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";

const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Luci",
  description: "Business account management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={oxygen.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
