"use client";
import styled, { DefaultTheme, css } from "styled-components";
import { responsiveFontSize } from "../../Styles/helperStyles";

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
      color: ${theme.colors.mainColor};
      ${responsiveFontSize(theme, "huge")}
      max-width: 400px;
      display: flex;
      gap: 5px;
      align-items: center;
      height: 100%;

      & > h1 {
        width: fit-content;
        display: inline-block;
        max-height: 100%;
      }

      & > div {
        width: 70px;
      }
  `}
`;