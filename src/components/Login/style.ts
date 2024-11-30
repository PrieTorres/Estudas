import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`

      & label {
        color:black;
        width: 100%;
      }

      & input {
        max-height: 100%;
      }
  `}
`;