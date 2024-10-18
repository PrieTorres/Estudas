import { responsiveFontSize } from '@/Styles/helperStyles';
import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    padding: ${theme.spacings.large};

    h1 {
      ${responsiveFontSize(theme, "huge")}
      text-align: center;
    }

    h2 {
      margin-top: 15px;
      ${responsiveFontSize(theme, "xlarge")}
    }

    & a {
      text-decoration: underline;
      transition: all 0.3s ease-in-out;
    }

    & a:hover {
      text-shadow: 0px 0px 3px ${theme.colors.white};
    }

    h3 {
      margin-top: 10px;
      ${responsiveFontSize(theme, "large")}
    }

    h4 {
      margin-top: 10px;
    }

    ul {
      margin-top: 5px;
      margin-bottom: 15px;
    }

    ul > li {
      list-style: disc;
      margin-left: 20px;
    }

    hr {
      margin-bottom: 8px;
    }

    div > p {
      margin-bottom: 8px;
    }

    & img {
      width: 100%;
    }

    & img::after {
      border-radius: ${theme.radius.default};
    }

    & table {
      width: 100%;
      border-collapse: collapse;
    }
    
    & td, & th {
      border: 1px solid;
      padding: ${theme.spacings.small};
    }

    @media ${theme.media.lteBig} {
      & img {
        width: 70%;
        margin: auto;
        padding: ${theme.spacings.large};
      }
    }

    @media ${theme.media.lteMedium} {
      padding: ${theme.spacings.medium};
    }

    @media ${theme.media.lteSmall} {
      padding: ${theme.spacings.small};
    }
    
  `}
`;