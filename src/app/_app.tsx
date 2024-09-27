import { AppProps } from 'next/app';
import Layout from './layout'; // Ajuste o caminho conforme necessário
import { clientConfig, serverConfig } from "@/config";
import { notFound } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

const MyApp = ({ Component, pageProps }: AppProps) => {
  getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  }).then((tokens) => {
    if (!tokens) {
      notFound();
    }
  });

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
