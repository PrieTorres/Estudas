"use client";

import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
        height: ${theme.height.sectionHeight};
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 100%;
  `}
`;