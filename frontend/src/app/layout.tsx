import type { Metadata } from "next";
import "./globals.css";
import AppTheme from '@/components/AppTheme';

export const metadata: Metadata = {
  title: "PNalog",
  //description: "Приложение на Next.js и MUI",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
    <body>
    <AppTheme>
      {children}
    </AppTheme>
    </body>
    </html>
  );
}
