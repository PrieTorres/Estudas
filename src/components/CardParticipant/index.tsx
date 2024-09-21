import { ReactElement } from 'react';
import { Container } from './styles';
import { SafeImage } from '../SafeImage';

interface CardParticipantProps {

}

export const CardParticipant = ({ }: CardParticipantProps): ReactElement => {

  return (
    <Container>
      <SafeImage />
      <h2>Priscila Torres</h2>
      <p>
        Desenvolvedora do site, estudante no 1 semestre de engenharia de software, responsável por todo e qualquer possível bug no site (foi mal)
      </p>
    </Container>
  );
};