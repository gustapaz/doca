import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title:
    "DOCA · Planejamento de carga sintética com restrições de peso e empilhamento",
  description:
    "Planejamento de carga sintética com restrições de peso e empilhamento",
  metadataBase: new URL("https://doca-gustapaz.starrylinen.chatgpt.site"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "DOCA",
    description:
      "Planejamento de carga sintética com restrições de peso e empilhamento",
    type: "website",
    locale: "pt_BR",
  },
  icons: { icon: "/favicon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
