
import "../styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BaanJot - Hormone Matching System",
  description: "Student hormone matching application",
  viewport: "width=device-width, initial-scale=1",
  robots: "noindex, nofollow", // Prevent indexing if this is internal
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
      <body className="bg-black absolute inset-0 w-full h-full overflow-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
