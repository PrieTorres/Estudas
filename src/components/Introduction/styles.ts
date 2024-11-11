"use client"
import { responsiveFontSize } from '@/Styles/helperStyles';
import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.span`
  ${({ theme }: { theme: DefaultTheme }) => css`
    & h1 {
      ${responsiveFontSize(theme, "xhuge")}
    }

    @media ${theme.media.lteBig} {
      display: flex;
      justify-content: center;
      align-items: center;
      

      & div:has(img) {
        min-width: 400px;
        max-width: 70%;
      }
    }

    @media ${theme.media.lteBigger} {
      & div:has(img) {
        min-width: 600px;
        max-width: 70%;
      }
    }
    
  `}
`;