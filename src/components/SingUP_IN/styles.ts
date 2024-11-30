import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    
      & label {
        width: 100%;
      }

      & input {
        max-height: 100%;
      }


    & > div {
      background: ${theme.colors.mainBg};
    }
  `}
`;