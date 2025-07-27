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
      
        <div
          style={{ objectFit: "contain", animationDelay: "1.25s" }}
          className="text-3xl font-medium text-center absolute top-6/14 left-0 right-0 transform -translate-y-1/2 transition-smooth animate-fade-in opacity-0"
        >
          กรอกเบอร์โทรศัพท์
        </div>

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
