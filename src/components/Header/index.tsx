"use client"
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { Container } from './styles';
import { Menu } from '../Menu';
import { SignButtons } from '../SingButtons';
import { MainLogo } from '../MainLogo';
import { json } from 'stream/consumers';
import { ThemeProvider } from 'styled-components';
import { useThemeContext } from '../Provider/Provider';



export const Header = (): ReactElement => {
  const { isLight, changeTheme } = useThemeContext();
  // const [isLight,setIslight]= useState<boolean>(false);
  // useEffect(() =>{
  //   console.log(isLight);    
  // },[isLight]);
  // let changeTheme=() => {
  //   setIslight(Boolean(localStorage.getItem("IsLight")));
  //   console.log(isLight);
  //   setIslight(!Boolean(isLight));
  //   localStorage.setItem("IsLight",JSON.stringify(isLight))
  // }
  return (
      <Container className='flex '>
        <MainLogo />
        <div className="max-sm:hidden">
          <Menu />
        </div>
        <div className='text-[1.5rem] flex gap-4 '>
          <SignButtons  />
          <button   onClick={changeTheme}>{isLight ? "Dark 🌑" : "Light ☀"}</button>
        </div>
        <div className="hidden max-sm:block" style={{ width: "100%" }}>
          <Menu />
        </div>

      </Container>
  );
};
