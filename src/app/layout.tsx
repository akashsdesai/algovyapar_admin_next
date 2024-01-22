import { Inter } from "next/font/google";
import Controls from '../Controls/Controls';
import "./globals.css";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className + " flex flex-row"}>
        <NextAuthProvider>
          <Controls />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
