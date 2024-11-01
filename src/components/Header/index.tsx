"use client"
import { ReactElement, useEffect } from 'react';
import { Container } from './styles';
import { Menu } from '../Menu';
import { SignButtons } from '../SingButtons';
import { MainLogo } from '../MainLogo';
import { json } from 'stream/consumers';

export const Header = (): ReactElement => {
  useEffect(() =>{
    
  });
  let changeTheme=() => {
    let isLight:any=localStorage.getItem("IsLight");
    isLight=!isLight;
    console.log(isLight);
    localStorage.setItem("IsLight",JSON.stringify(isLight))
  }
  return (
    <Container>
      <MainLogo />
      <div className="max-sm:hidden">
        <Menu />
      </div>
      <SignButtons />
      <div className='text-[1.5rem]'>
        <button onClick={()=>changeTheme()} >Dark Theme</button>
      </div>
      <div className="hidden max-sm:block" style={{ width: "100%" }}>
        <Menu />
      </div>
    </Container>
  );
};