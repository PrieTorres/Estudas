import { ReactElement } from 'react';
import { Container } from './styles';
import { InsigniaCircle } from '../InsigniaCircle';

interface CertifiedCourseProps {
  title: string,
  score: number,
}

export const CertifiedCourse = ({ title, score }: CertifiedCourseProps): ReactElement => {

  return (
    <Container>
      <InsigniaCircle upperText={title} middleText={`${score.toFixed(2)}%`} bottomText='Estudas Approved' />
    </Container>
  );
};