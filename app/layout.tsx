import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Providers } from "./providers";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MADS: Model Analysis & Decision Support",
  description:
    "Open-source high-performance computational framework for data- & model-based analyses in Julia and C.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
