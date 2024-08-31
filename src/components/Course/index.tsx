"use client";

import { ReactElement, ReactNode } from 'react';
import * as Styled from './styles';


interface CourseProps {
  title: string; 
  progress: number;
  //onClick: CallableFunction;
};

export const Course = ({ title, progress }: CourseProps) => {
  return (
    <Styled.Container>
      <h2>{title}</h2>
      <div>{progress} %</div>
      <div>{progress >= 100 ? "Concluído" : "Pendente"}</div>
    </Styled.Container>
  )
}