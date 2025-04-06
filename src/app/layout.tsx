import type {Metadata} from "next";
import {Karla, Nanum_Pen_Script} from "next/font/google";
import "./globals.css";
import "./components.css";
import {Navbar} from "@/components/Navbar/index";
import AnimatedCursor from "react-animated-cursor";
import {ScrollProgress} from "@/components/scroll-progress";
import {SeoResponse} from "@/lib/models";
import {getFullMediaUrl, getSectionData} from "@/utils/utils";
import {siteConfig} from "@/constants/config";
import {Analytics} from "@vercel/analytics/react"
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
const nanumPenScript = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nanum-pen-script",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSectionData("seos");
  const seoData: SeoResponse = data?.data?.[0];
  const openGraphImageUrl = getFullMediaUrl(seoData?.image?.url);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon/favicon.ico",
      shortcut: "/favicon/favicon-16x16.png",
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: `/favicon/site.webmanifest`,
    openGraph: {
      url: siteConfig.url,
      title: seoData?.title || siteConfig.title,
      description: seoData?.description || siteConfig.description,
      siteName: siteConfig.title,
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: "Hansraj Saini - Full Stack Developer",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData?.title || siteConfig.title,
      description: seoData?.description || siteConfig.description,
      images: [openGraphImageUrl],
      site: "https://x.com/Hansraj32323520",
      creator: "@Hansaj32323520",
    },

    alternates: {
      canonical: siteConfig.url,
    },
    appLinks: {
      web: {
        url: siteConfig.url,
        should_fallback: true,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Hansraj Saini",
            "jobTitle": "Full Stack Developer",
            "url": "https://hansrajsaini.vercel.app/",
            "sameAs": [
              "https://www.linkedin.com/in/hansraj-saini-634864190/",
              "https://github.com/Hansraj8149",
              "https://x.com/Hansraj32323520"
            ]
          })}
        </script>

      </head>
      <body className={`${karla.variable} ${nanumPenScript.variable} antialiased`}>
        <div className="lg:block md:block hidden">
          <AnimatedCursor
            innerSize={4}
            outerSize={40}
            innerScale={0.7}
            outerScale={2}
            innerStyle={{
              backgroundColor: "rgb(20, 184, 166)",
            }}
            outerStyle={{
              backgroundColor: "transparent",
              border: "2px solid white",
            }}
            outerAlpha={1}
            clickables={[
              "a",
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              "label[for]",
              "select",
              "textarea",
              "button",
              ".link",
              {
                target: ".custom",
              },
            ]}
          />
        </div>
        <Analytics />
        <Navbar />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
