"use client";

import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.article`
  ${({ theme }: { theme: DefaultTheme, height?: number }) => css`
      border: 1px solid ${theme.colors.darkGrey};
      padding: ${theme.spacings.medium};
      border-radius: ${theme.radius.default};
      width: 300px;
      
  `}
`;