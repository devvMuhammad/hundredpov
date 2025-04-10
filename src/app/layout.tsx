import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TanstackQueryProvider } from "@/components/TanstackProvider"
import { SessionProvider } from "@/lib/providers/session-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gaming-darker text-white overflow-x-hidden">
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