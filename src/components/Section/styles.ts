"use client";

import styled, { DefaultTheme, css } from 'styled-components';
import { SectionTypes } from '.';
import { responsiveFontSize } from '@/Styles/helperStyles';

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
        justify-content: flex-start;
        gap: 12px;
        flex-wrap: wrap;
        align-content: flex-start;
      ` : ""}

      & h1 {
        ${responsiveFontSize(theme, "xlarge")}
      }

      @media ${theme.media.lteSmall} {
        padding: ${theme.spacings.medium};
      }

      @media ${theme.media.lteMedium} {
        justify-content: center;
      }
  `}
`;