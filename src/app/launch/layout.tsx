import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinWise",
  description: "FinWise expence manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsSans}`}>{children}</body>
    </html>
  );
}
