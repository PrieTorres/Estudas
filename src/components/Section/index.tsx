import { ReactElement, ReactNode } from 'react';
import * as Styled from './styles';
import { TranslatedSpan } from '../TranslatedSpan';

export type SectionTypes = "default" | "centered" | "flex-list" | "flex-list-stretch";

export interface SectionProps {
  children: ReactNode | ReactElement | string;
  type?: SectionTypes;
}

export const Section = ({ children, type }: SectionProps) => {
  return (
    <Styled.Container type={type}>
      {typeof children == "string" ?
        <TranslatedSpan>{children}</TranslatedSpan>
        : children
      }
    </Styled.Container>
  )
}