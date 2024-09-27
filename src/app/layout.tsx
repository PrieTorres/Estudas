import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Provider } from "@/components/Provider/Provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageContextProvider } from "@/components/Contexts/LanguageContext";
import '../Styles/global.css';
import { clientConfig, serverConfig } from "@/config";
import { notFound } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import React from "react";

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

  let tokens;
  getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  }).then((token) => {
    tokens = token;
    if (!token) {
      notFound();
    }
  }).catch((err) => {
    console.error("unable to get tokens", err);
  });

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { email:tokens?.decodedToken?.email, tokens });
    }
    return child;
  });

  return (
    <LanguageContextProvider>
      <html lang="en">
        <body>
          <Provider>
            <Header />
            <main>
              {childrenWithProps}
            </main>
            <Footer />
            <div id="default-portal"></div>
          </Provider>
        </body>
      </html>
    </LanguageContextProvider>
  );
}
