"use client"
import { responsiveFontSize } from '@/Styles/helperStyles';
import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    &, & > div {
      width: 100%;
    }

    & h1 {
      ${responsiveFontSize(theme, "xhuge")}
    }

    @media ${theme.media.lteBig} {
      display: flex;
      justify-content: center;
      align-items: center;
      

      & div:has(img) {
        min-width: 400px;
        max-width: 90%;
      }
    }

    @media ${theme.media.lteBigger} {
      & div:has(img) {
        min-width: 600px;
        max-width: 80%;
      }
    }
    
  `}
`;