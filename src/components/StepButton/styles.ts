import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.button`
  ${({ theme }: { theme: DefaultTheme }) => css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 2rem;
    background-color: ${theme.colors.lightGrey};
    color: ${theme.colors.white};
    transition: all .5s ease;

    &.active {
      background-color: ${theme.colors.successfulGreen};
    }
    
  `}
`;