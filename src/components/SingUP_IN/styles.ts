import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    
      & label {
        width: 100%;
      }

      & input {
        max-height: 100%;
      }

      & form {
        display: flex;
        flex-wrap: wrap;
      }
  `}
`;