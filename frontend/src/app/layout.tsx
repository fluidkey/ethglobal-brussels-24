import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RainbowWagmiProvider } from "@/context/rainbowWagmiContext";
import "@rainbow-me/rainbowkit/styles.css";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fluid.loan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowWagmiProvider cookie={headers().get("cookie") ?? ""}>
          {children}
        </RainbowWagmiProvider>
      </body>
    </html>
  );
}
