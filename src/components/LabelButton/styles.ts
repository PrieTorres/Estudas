import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    padding: ${theme.spacings.small};
    background: ${theme.colors.secondaryBg};
    color: ${theme.colors.mainColor};
    border-radius: ${theme.radius.default};
    transition: background .5s ease;
    cursor: pointer;

    &:hover {
      background: ${theme.colors.secondaryBgDarker};
    }

    & .correct {
      background: ${theme.colors.successfulGreen};
    }

    & .wrong {
      background: ${theme.colors.};
    }
  `}
`;