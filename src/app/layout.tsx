import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/Provider/Provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageContextProvider } from "@/components/Contexts/LanguageContext";
import '../Styles/global.css';
import "@/i18n.js";

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
      <html lang="en">
        <head>
          <script src="https://www.google.com/recaptcha/enterprise.js?render=6LeWoGUqAAAAAM8f-CcxgiG6CYIyesTt4_k2l7aF"></script>
        </head>
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
