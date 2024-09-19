"use client";
import { ReactElement } from 'react';
import { Container } from './styles';

export interface LabelButtonProps {
  label: string;
  onClick:  (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  width?: string | number;
  disabled?: boolean;
}

export const LabelButton = ({ label, onClick, className, width, disabled }: LabelButtonProps): ReactElement => {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick(event);
    }
  };

  return (
    <Container onClick={handleClick} className={className} width={width} disabled={disabled} label={label}>
      {label}
      <div className="disabled-cover"></div>
    </Container>
  );
};
