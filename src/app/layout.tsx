import "./globals.css";
import { Poppins } from "next/font/google";
import NavBar from "@/components/common/navBar";
import { ThemeProvider } from "@/context/themeProvider";
import FooterComp from "@/components/common/footerComp";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-light_mode  dark:bg-dark_mode  px-4 ">
            <NavBar />
            <main className="flex-grow ">{children}</main>
            <FooterComp />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
