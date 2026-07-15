import type { Metadata } from "next";
import { Inter, Anton, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Font d'affichage « Impact » : condensée, lourde, qui frappe.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mathew Simon · Développeur Unity C# / C++",
  description:
    "Portfolio de Mathew Simon, développeur Unity (C#) et C++ : gameplay, moteur, AR/VR, simulation et IA/LLM.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${anton.variable} ${geistMono.variable} h-full`}
    >
      <head>
        {/* Applique le thème avant le paint pour éviter le flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="paper-grain min-h-full flex flex-col">{children}</body>
    </html>
  );
}
