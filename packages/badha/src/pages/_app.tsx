import "../styles/globals.css";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { Provider, signIn, useSession } from "next-auth/client";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";

import Auth from "../components/auth";

type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> & Partial<AuthEnabledComponentConfig>;

export type ProtectedAppProps = AppProps & { Component: NextComponentWithAuth };

import { AuthEnabledComponentConfig } from "@/types/auth";
const MyApp: NextPage<ProtectedAppProps> = ({ Component, pageProps }): React.ReactElement => {
  return (
    <Provider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <NextNprogress color="#FF3800" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
          <Component {...pageProps} />
        </Auth>
      ) : (
        <>
          <NextNprogress
            color="#FF3800"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            options={{ showSpinner: true }}
          />
          <Component {...pageProps} />
        </>
      )}
    </Provider>
    // <RecoilRoot>
  );
};

export default MyApp;
