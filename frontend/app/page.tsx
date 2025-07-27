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
          src="/images/tel.png"
          alt="main"
          width={400}
          height={300}
          style={{ 
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            objectFit: "contain"
          }}
          className="pb-[120px] transition-smooth opacity-0 animate-fade-in animate-delay-1200"
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
