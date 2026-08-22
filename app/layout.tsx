import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Wisuda — Maylani Syafvitri, S.T.",
  description:
    "Dengan penuh syukur, mengundang Anda untuk hadir dalam wisuda Maylani Syafvitri, S.T. — Teknik Industri Universitas Andalas, Periode VI 2026.",
  openGraph: {
    title: "Undangan Wisuda — Maylani Syafvitri, S.T.",
    description: "Hadir dan doakan perjalanan barunya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${GeistSans.variable}`}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
