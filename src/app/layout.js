import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "./Wrapper/ClientWrapper";
import ContextProvider from "./Wrapper/Context";
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap", // Ensure fonts load properly without layout shift
  fallback: ["sans-serif"],
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap", // Ensure fonts load properly without layout shift
  fallback: ["sans-serif"],
});

export const metadata = {
  title: "DocInsight",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "var(--font-roboto)" }}
        className={`${poppins.variable} ${roboto.variable} antialiased bg-gray-50`}
      >
        <ContextProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ContextProvider>
      </body>
    </html>
  );
}
