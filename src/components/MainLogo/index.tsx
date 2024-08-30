import { ReactElement } from 'react';
import { Container } from './styles';
import { SafeImage } from '../SafeImage';

export const MainLogo = (): ReactElement => {
  return (
    <Container>
     <h1>Estudas</h1>
     {/*<SafeImage src={logo} text='logo pixel art burger'/>*/}
    </Container>
  );
};