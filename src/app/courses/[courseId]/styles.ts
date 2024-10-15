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
      text-shadow: 0px 0px 2px ${theme.colors.white};
      text-decoration: underline;
    }

    h3 {
      margin-top: 10px;
      ${responsiveFontSize(theme, "large")}
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
    
  `}
`;