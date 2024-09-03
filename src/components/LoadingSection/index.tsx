import { ReactNode } from 'react';
import { Container } from './styles';
import { LoadingSpin } from '../LoadingSpin';

export const LoadingSection = (): ReactNode => {
  return (
    <Container>
        <LoadingSpin/>
    </Container>
  )
}