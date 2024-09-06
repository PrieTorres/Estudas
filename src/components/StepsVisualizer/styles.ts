import styled, { DefaultTheme, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme; }) => css`
    display: flex;
    justify-content: stretch;
    padding: ${theme.spacings.small};
    width: 60%;
    margin: 0 auto;

    & .line {
      flex-grow: 1;
      height: 5px;
      width: 1px;
      background-color: ${theme.colors.lightGrey};
      transition: all .5s ease;
    }

    & .line.active{
      background-color: ${theme.colors.successfulGreen};
    }
  `}
`;