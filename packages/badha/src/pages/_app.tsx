import "../styles/globals.css";
import { NextPage } from "next";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
const MyApp: NextPage<AppProps> = ({ Component, pageProps }): React.ReactElement => {
  return (
    // <RecoilRoot>
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    // </RecoilRoot>
  );
};

export default MyApp;
