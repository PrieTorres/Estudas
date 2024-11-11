import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/Provider/Provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageContextProvider } from "@/components/Contexts/LanguageContext";
import '../Styles/global.css';
import "@/i18n.js";
import { ThemeProvider } from "styled-components";
import { theme } from "@/Styles/theme";
import { themeLight } from "@/Styles/theme";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estudos programação",
  description: "Estude alguns tópicos de programação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <LanguageContextProvider>
      <html lang="pt-br">
        <body>
            <Provider>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
              <div id="default-portal"></div>
            </Provider>
        </body>
      </html>
    </LanguageContextProvider>
  );
}
