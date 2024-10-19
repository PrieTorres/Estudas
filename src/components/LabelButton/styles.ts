import styled, { DefaultTheme, css } from 'styled-components';
import { LabelButtonProps } from '.';

interface ContainerProps extends LabelButtonProps {
  theme: DefaultTheme;
}

export const Container = styled.div<LabelButtonProps>`
  ${({ theme, disabled }: ContainerProps) => css`
    padding: ${theme.spacings.small};
    background: ${theme.colors.secondaryBg};
    color: ${theme.colors.mainColor};
    border-radius: ${theme.radius.default};
    will-change: background;
    transition: background .5s ease;
    cursor: pointer;

    ${!disabled ? css`&:hover {
        background: ${theme.colors.secondaryBgDarker};
      }` : ""
    }

    &.correct, &.wrong, &.correct-option {
      transition:none;
    }

    &.correct {
      background: ${theme.colors.successfulGreen};
    }

    &.correct-option {
      box-shadow: 0px 0px 4px 1px ${theme.colors.successfulGreen};
    }

    &.wrong {
      background: ${theme.colors.darkerDangerRed};
    }

    & .disabled-cover {
      display: none;
    }

    ${disabled ? css`
      cursor: not-allowed;
      position: relative;
      overflow: hidden;
      
      & .disabled-cover {
        display: block;
        position: absolute;
        background: ${theme.colors.darkGrey};
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.6;
        z-index: 10;
      }

    ` : ""}
  `}
`;