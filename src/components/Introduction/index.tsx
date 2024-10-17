import { ReactElement } from 'react';
import * as Styled from './styles';
import { SafeImage } from '../SafeImage';
import nice_duck from "@/assets/img/patro_transformed.png";


export const Introduction = ({ }): ReactElement => {
  return (
    <Styled.Container>
      <SafeImage src={nice_duck} text='boas vindas!' />
      <div>
        <h1 id="title">Boas vindas ao Estudas!</h1>
        <h3>
          Seja bem-vindo (a) ao Estudas, o seu portal definitivo para aprender os fundamentos da programação usando a linguagem de programação C.
          Nosso objetivo é fornecer a você as ferramentas e o conhecimento necessários para dominar uma das linguagens de programação mais poderosas e influentes da história.
          Nossos cursos são projetados para todos os níveis, desde iniciantes até programadores experientes que desejam aprimorar suas habilidades.
          Com tutoriais e exercícios detalhados, garantimos que você terá uma experiência de aprendizado completa e enriquecedora.
          Comece agora mesmo fazendo login e entrando na aba “Cursos”!
        </h3>
      </div>
    </Styled.Container>
  );
};