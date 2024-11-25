"use client";

import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme; }) => css`
      padding: 2px;
      margin: ${theme.spacings.small};
      border-radius: ${theme.radius.default};
      position: relative;
      transition: all 0.3s;

      &::after{
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 0.2rem;
      background-color: ${theme.colors?.secondaryColor};
      transition: all .3s ease-in-out;
    }

      &:hover::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: ${theme.colors.secondaryColor};
        bottom: 0;
        left: 0;
      }

  `}
`;