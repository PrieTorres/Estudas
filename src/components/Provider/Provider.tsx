"use client";
import { ReactElement, ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/Styles/theme";
import { GlobalStyles } from "@/Styles/global-styles";
import StyledComponentsRegistry from '@/lib/registry';
import useI18n from '@/hooks/useI18n';
import { PageProvider } from '@/context/pageContext';

export const Provider = ({ children, session }: { children: ReactNode, session?: any; }): ReactElement => {
  useI18n();

  return (
    <SessionProvider session={session}>
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <PageProvider>
            {children}
          </PageProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};