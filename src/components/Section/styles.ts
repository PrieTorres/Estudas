"use client";

import styled, { DefaultTheme, css } from 'styled-components';
import { SectionTypes } from '.';

interface ContainerProps {
  theme: DefaultTheme;
  type?: SectionTypes; // Type should be optional if not always provided
}

export const Container = styled.section<ContainerProps>`
  ${({ theme, type }: ContainerProps) => css`
      min-height: ${theme.height.sectionHeight};
      padding: ${theme.spacings.huge};
      
      ${type == "centered" ? css`
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
      ` : ""}

      ${type == "flex-list" ? css`
        display: flex;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        align-content: flex-start;
      ` : ""}
  `}
`;