"use client";
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { theme,themeLight } from "@/Styles/theme";
import { GlobalStyles } from "@/Styles/global-styles";
import StyledComponentsRegistry from '@/lib/registry';
import useI18n from '@/hooks/useI18n';
import { PageProvider } from '@/context/pageContext';

export const Provider = ({ children, session }: { children: ReactNode, session?: any; }): ReactElement => {
  useI18n();
  const [mounted,setMounted] =useState(false);
  let currnetTheme:any=theme;
  useEffect(()=>{
    setMounted(true);
    currnetTheme=localStorage.getItem("IsLight") || "" ? themeLight: theme
  })
  
  return (
    <SessionProvider session={session}>
      <StyledComponentsRegistry>
        <ThemeProvider theme={currnetTheme}>
          <GlobalStyles />
          <PageProvider>
            {children}
          </PageProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};