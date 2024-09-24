"use client";

import { responsiveFontSize } from "@/Styles/helperStyles";
import styled, { css, DefaultTheme } from "styled-components";

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: flex;
    gap: 12px;
    max-height: 100%;
    ${responsiveFontSize(theme, "medium")}

    @media ${theme.media.lteSmall} {
      flex-flow: column;
      width: 100%;
      text-align: center;
      align-items: center;
      ${responsiveFontSize(theme, "large")}
    }
  `}
`;