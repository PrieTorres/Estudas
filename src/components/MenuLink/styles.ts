"use client";

import { responsiveFontSize } from '@/Styles/helperStyles';
import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme; }) => css`
      padding: ${theme.spacings.small};
      border-radius: ${theme.radius.default};

  `}
`;