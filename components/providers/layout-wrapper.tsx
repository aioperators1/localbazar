"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Maintenance } from "@/components/store/Maintenance";

export function LayoutWrapper({ 
  children, 
  settings 
}: { 
  children: React.ReactNode;
  settings: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  // Maintenance Mode Check
  if (settings?.maintenanceMode === "true" && pathname !== "/maintenance" && !pathname?.startsWith("/login") && !pathname?.startsWith("/api/auth")) {
    return <Maintenance />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Header settings={settings} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />
      <Toaster />
    </div>
  );
}
