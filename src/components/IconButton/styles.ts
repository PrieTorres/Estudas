"use client";

import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.button`
  ${({ theme }: { theme: DefaultTheme }) => css`
      outline: none;
      border: none;
      border-radius: 8px;
      transition: all .5s ease;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;

      &:hover {
        background: ${theme.colors.secondaryBg};
      }
  `}
`;