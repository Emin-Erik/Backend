import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";
import { ClientCookiesProvider } from "./provider";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientCookiesProvider value={cookies().getAll()}>
      <html lang="en">
        <body className={inter.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClientCookiesProvider>
  );
}
