import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme; }) => css`
    & svg {
      top: 0.2rem
    }

    & input {
      padding: 8px;
      padding-left: 3rem;
      border-radius: 8px;
      color: ${theme.colors.mainColor};
    }

    & > div {
      background: ${theme.colors.mainBg};
    }
  `}
`;