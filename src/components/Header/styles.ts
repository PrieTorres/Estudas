"use client";
import styled, { DefaultTheme, css } from "styled-components";
import { responsiveFontSize } from "../../Styles/helperStyles";

export const Container = styled.header`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${theme.height.headerheight};
    min-width: fit-content;
    overflow: hidden;
    color: ${theme.colors.mainColor};
    padding: ${theme.spacings.medium};
    background: ${theme.colors.black};
    background: ${theme.gradient.darkGreyGradient};
    box-shadow: 0 1px 20px rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    ${responsiveFontSize(theme, "xlarge")}

    @media ${theme.media.lteMedium} {
      height: auto;
      align-items: center;
      ${responsiveFontSize(theme, "xlarge")}
    }

    @media ${theme.media.lteSmallMed} {
      gap: 8px;
      padding: ${theme.spacings.small};
      flex-wrap: wrap;
    }
    button{
      background: ${theme.colors.mainBg};
      padding: 8px;
      border-radius: 8px;
    }
   
  `}
`;