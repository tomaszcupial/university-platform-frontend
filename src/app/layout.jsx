import "./globals.css";
import { Inter } from "next/font/google";
import clsx from "clsx";
import AuthProvider from "@/app/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "University Platform",
  description: "University platform for students and teachers",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className="h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
    >
      <body className={clsx(inter.className, "flex h-full flex-col")}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
