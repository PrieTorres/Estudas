import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme; }) => css`
    
    & .circle-text {
      display: block;
      margin: 0 auto;
      text-align: center;
    }

    text {
      color: ${theme.colors.white};	
    }
  `}
`;