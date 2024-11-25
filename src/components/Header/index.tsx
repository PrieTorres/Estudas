"use client"
import {  ReactElement } from 'react';
import { Container } from './styles';
import { Menu } from '../Menu';
import { SignButtons } from '../SingButtons';
import { MainLogo } from '../MainLogo';
import { useThemeContext } from '../Provider/Provider';



export const Header = (): ReactElement => {
  const { isLight, changeTheme } = useThemeContext();
 
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
