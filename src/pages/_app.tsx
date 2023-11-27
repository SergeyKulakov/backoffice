import React, { useEffect } from "react";
import type { ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Toaster } from "../components/toaster";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "chart.js/auto";

import "../vendor/perfect-scrollbar.css";

import "../i18n";
import createTheme from "../theme";

import { ThemeProvider } from "../contexts/ThemeContext";
import useTheme from "../hooks/useTheme";
import { store, useDispatch } from "../store";
import createEmotionCache from "../utils/createEmotionCache";

import { AuthConsumer, AuthProvider } from "../contexts/auth/amplify-context";
import { getUserInfo } from "../thunks/userList";

const clientSideEmotionCache = createEmotionCache();

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
  emotionCache?: EmotionCache;
  Component: Page<P>;
};

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const { theme } = useTheme();

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Exactitude" defaultTitle="Exactitude" />
        <ReduxProvider store={store}>
          {/* @ts-ignore */}
          <AuthProvider>
            <AuthConsumer>
              {(auth) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MuiThemeProvider theme={createTheme(theme)}>
                    {getLayout(<Component {...pageProps} />)}
                    <Toaster />
                  </MuiThemeProvider>
                </LocalizationProvider>
              )}
            </AuthConsumer>
          </AuthProvider>
        </ReduxProvider>
      </HelmetProvider>
    </CacheProvider>
  );
}

const withThemeProvider = (Component: any) => {
  const AppWithThemeProvider = (props: JSX.IntrinsicAttributes) => {
    return (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    );
  };
  AppWithThemeProvider.displayName = "AppWithThemeProvider";
  return AppWithThemeProvider;
};

export default withThemeProvider(App);
