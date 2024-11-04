import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    
      & label {
        margin-bottom: 30px;
        width: 100%;
      }

      & input {
        background-color: ${theme.colors.darkGrey};
        max-height: 100%;
      }

      & form {
        display: flex;
        flex-wrap: wrap;
      }
  `}
`;