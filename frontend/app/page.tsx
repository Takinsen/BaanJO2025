import Image from "next/image";
import ClientHomePage from "../components/home/ClientHomePage";

// This is now a Server Component (SSR)
export default function Home() {
  return (
    <>
      {/* Background layers with staggered animations */}
        <Image
          src="/images/background.png"
          alt="main"
          fill
          style={{ objectFit: "contain" }}
          className="transition-smooth animate-fade-in"
          priority
        />
      
        <Image
          src="/images/fill.png"
          alt="main"
          fill
          style={{ objectFit: "contain", animationDelay: "1.25s" }}
          className="transition-smooth animate-fade-in opacity-0"
          priority
        />
      
      {/* Client-side interactive component */}
      <ClientHomePage />
    
      <Image
        src="/images/people.png"
        alt="main"
        fill
        style={{ objectFit: "contain" }}
        className="transition-smooth animate-delay-200"
        priority
      />
      
      <Image
        src="/images/header.png"
        alt="main"
        fill
        style={{ objectFit: "contain" }}
        className="transition-smooth animate-zoom-in"
        priority
      />
    </>
  );
}
