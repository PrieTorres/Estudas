"use client";

import { ReactElement } from 'react';
import { Container } from './styles';

export interface StepButtonProps {
  onClick: CallableFunction;
  step: number;
  active: boolean;
}

export const StepButton = ({ onClick, step, active }: StepButtonProps): ReactElement => {

  return (
    <Container onClick={onClick} className={active? "active" : ""}>
      {step}
    </Container>
  );
};