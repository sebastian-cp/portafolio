import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getContent, isLocale, locales } from "@/i18n";
import { themeInitScript } from "@/lib/theme";
import "../globals.css";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getContent(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { es: "/es", en: "/en" } },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          {t.ui.skip}
        </a>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
