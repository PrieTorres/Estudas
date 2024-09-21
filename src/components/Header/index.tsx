import { ReactElement } from 'react';
import { Container } from './styles';
import { Menu } from '../Menu';
import { SignButtons } from '../SingButtons';
import { MainLogo } from '../MainLogo';

export const Header = (): ReactElement => {
  return (
    <Container>
      <MainLogo/>
      <Menu />
      <SignButtons />
    </Container>
  );
};