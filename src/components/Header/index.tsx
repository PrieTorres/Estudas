import { ReactElement } from 'react';
import { Container } from './styles';
import { Menu } from '../Menu';
import { SignButtons } from '../SingButtons';
import { MainLogo } from '../MainLogo';

export const Header = (): ReactElement => {
  return (
    <Container>
      <MainLogo />
      <div className="max-sm:hidden">
        <Menu />
      </div>
      <SignButtons />
      <div className="hidden max-sm:block" style={{ width: "100%" }}>
        <Menu />
      </div>
    </Container>
  );
};