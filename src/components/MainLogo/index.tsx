import { ReactElement } from 'react';
import { Container } from './styles';
import ActiveLink from '../ActiveLink';

export const MainLogo = (): ReactElement => {
  return (
    <Container>
      <ActiveLink href="/" target="_self">
        <h1>Estudas</h1>
      </ActiveLink>
    </Container>
  );
};