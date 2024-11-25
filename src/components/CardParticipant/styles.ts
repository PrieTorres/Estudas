"use client";

import { responsiveFontSize } from '@/Styles/helperStyles';
import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.article`
  ${({ theme }: { theme: DefaultTheme; }) => css`
    border: 1px solid ${theme.colors.secondaryColor};
    box-shadow: 0px 0px 4px ${theme.colors.secondaryColor};
    width: 320px;
    padding: ${theme.spacings.small};
    text-align: center;
    border-radius: ${theme.radius.default};
    height: 430px;

    & p {
      ${responsiveFontSize(theme, "small")}
    }

    & h2 {
      ${responsiveFontSize(theme, "large")}
    }
    
    & img {
      border-radius:50%;
      width: 240px;
      height: 240px;
      object-fit: cover;
    }

    & div:has(img){
      display: flex;
      width: 100%;
      justify-content: center;
      height: auto;
    }

    @media ${theme.media.lteSmall} {
      width: 230px;
      height: 220px;

      & p {
        ${responsiveFontSize(theme, "medium")}
      }

      & img {
        width: 100px;
        height: 100px;
        margin-bottom: 12px;
      }
    }
  `}
`;