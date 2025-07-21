"use client";

import { StudentProvider } from "@/contexts/StudentContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <StudentProvider>
      {children}
    </StudentProvider>
  );
}
