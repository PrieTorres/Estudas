"use client";

import { responsiveFontSize } from '@/Styles/helperStyles';
import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.article`
  ${({ theme }: { theme: DefaultTheme; }) => css`
    border: 1px solid ${theme.colors.secondaryBg};
    box-shadow: 0px 0px 4px ${theme.colors.secondaryBg};
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
      width: 250px;

      & p {
        ${responsiveFontSize(theme, "medium")}
      }

      & img {
        width: 170px;
        height: 170px;
        margin-bottom: 12px;
      }
    }
  `}
`;