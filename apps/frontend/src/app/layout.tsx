import localFont from "next/font/local";
import StyledComponentsRegistry from "./common/providers/StyledComponentsRegistry";
import { Metadata } from "next";
import clsx from "clsx";
import "./globals.css";

import { SolanaProviders } from "./common/providers/SolanaProviders";

export const metadata: Metadata = {
  title: "Tiny SPL",
  description: "Manage your tiny SPL tokens",
};

const msSansSerif = localFont({
  src: [
    {
      path: "./fonts/ms_sans_serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ms_sans_serif_bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={clsx(msSansSerif.className, "bg-[#008080] h-full")}>
      <body className="h-full">
        <SolanaProviders>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </SolanaProviders>
      </body>
    </html>
  );
}