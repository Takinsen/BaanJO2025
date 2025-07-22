
import "../styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata } from "next";

const title = "BaanJo";
const description = "หาคู่ที่จะไปว้าวุ่นกับคุณ";

export const metadata: Metadata = {
  title,
  description,
  viewport: "width=device-width, initial-scale=1",

  openGraph: {
    title,
    description,
    url: "https://jo2025.vercel.app",
    siteName: "BaanJo",
    images: [
      {
        url: "https://jo2025.vercel.app/images/cover.png",
        width: 1920,
        height: 1200,
        alt: "BaanJo Preview Image",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://jo2025.vercel.app/images/cover.png"],
  },
};

// This is a Server Component (SSR)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preload" href="/fonts/can_Rukdeaw01.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/images/main.jpg" as="image" />
      </head>
      <body className="min-h-screen flex relative w-full bg-black">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
