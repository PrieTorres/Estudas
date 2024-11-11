"use client";
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { theme,themeLight } from "@/Styles/theme";
import { GlobalStyles } from "@/Styles/global-styles";
import StyledComponentsRegistry from '@/lib/registry';
import useI18n from '@/hooks/useI18n';
import { PageProvider } from '@/context/pageContext';
import { DefaultTheme } from 'styled-components/dist/types';

//
interface ThemeContextType {
  isLight: boolean;
  changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
//

export const Provider = ({ children, session }: { children: ReactNode, session?: any; }): ReactElement => {
  useI18n();
  const [mounted,setMounted] =useState(false);
  const [currnetTheme,setCurrnetTheme] =useState<DefaultTheme>(theme);

  const [isLight, setIsLight] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("IsLight");
    if (savedTheme) {
      setIsLight(JSON.parse(savedTheme));
    }
  }, []);
  useEffect(() => {
    // Update theme based on isLight state
    setCurrnetTheme(isLight ? themeLight : theme);
  }, [isLight]);


  const changeTheme = () => {
    const newTheme = !isLight;
    console.log(newTheme);
    setIsLight(newTheme);
    localStorage.setItem("IsLight", JSON.stringify(newTheme));
  };

  return (
    <SessionProvider session={session}>
      <StyledComponentsRegistry>
      <ThemeContext.Provider value={{ isLight, changeTheme }}>
        <ThemeProvider theme={currnetTheme}>
          <GlobalStyles />
          <PageProvider>
            {children}
          </PageProvider>
        </ThemeProvider>
        </ThemeContext.Provider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};