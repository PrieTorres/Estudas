import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.article`
  ${({ theme }: { theme: DefaultTheme }) => css`
    padding: 20px;
    & > div {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  `}
`;