"use client";
import { ReactElement } from 'react';
import { Container } from './styles';

export interface LabelButtonProps {
  label: string;
  onClick: CallableFunction;
  className?: string;
  width?: string | number;
  disabled?: boolean;
}

export const LabelButton = ({ label, onClick, className, width, disabled }: LabelButtonProps): ReactElement => {

  return (
    <Container onClick={!disabled? onClick : undefined} className={className} width={width} disabled={disabled}>
      {label}
      <div className="disabled-cover"></div>
    </Container>
  );
};