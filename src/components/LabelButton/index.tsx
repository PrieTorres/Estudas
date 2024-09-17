"use client";
import { ReactElement } from 'react';
import { Container } from './styles';

interface LabelButtonProps {
  label: string;
  onClick: CallableFunction;
  className: string;
}

export const LabelButton = ({ label, onClick, className }: LabelButtonProps): ReactElement => {

  return (
    <Container onClick={onClick} className={className}>
      {label}
    </Container>
  );
};