import styled, { DefaultTheme, css } from 'styled-components';
    
export const Container = styled.article`
  ${({ theme }: { theme: DefaultTheme }) => css`
    padding: 20px;
    & > div {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    & img {
      width: 100%;
      border-radius: ${theme.radius.default};
      padding: ${theme.spacings.medium};
      overflow: hidden;
    }
  `}
`;