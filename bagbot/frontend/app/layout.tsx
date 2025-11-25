import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SidebarProvider } from "@/components/sidebar/SidebarContext";

export const metadata = {
  title: "BAGBOT",
  description: "AI Trading Assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
