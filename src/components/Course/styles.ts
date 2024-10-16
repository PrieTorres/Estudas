"use client";

import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.article`
  ${({ theme }: { theme: DefaultTheme, height?: number }) => css`
      border: 1px solid ${theme.colors.darkGrey};
      padding: ${theme.spacings.medium};
      border-radius: ${theme.radius.default};
      width: 300px;
      height: 160px;
      cursor: pointer;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 0 5px 1px ${theme.colors.darkGrey};
      }
  `}
`;