import Image from "next/image";
import ClientHomePage from "../components/home/ClientHomePage";

// This is now a Server Component (SSR)
export default function Home() {
  return (
    <div className="min-h-screen flex relative w-full">
      <Image
        src="/images/main.jpg"
        alt="main"
        fill
        style={{ objectFit: "contain" }}
        className="transition-smooth"
        priority
        sizes="100vw"
      />
      
      {/* Client-side interactive component */}
      <ClientHomePage />
    </div>
  );
}
