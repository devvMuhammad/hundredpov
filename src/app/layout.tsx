import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TanstackQueryProvider } from "@/components/TanstackProvider"
import { SessionProvider } from "@/lib/providers/session-provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gaming-darker text-white overflow-x-hidden`}>
        <SessionProvider>
          <TanstackQueryProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </TanstackQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}