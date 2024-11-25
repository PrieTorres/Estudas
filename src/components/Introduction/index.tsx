import { ReactElement, useContext } from 'react';
import * as Styled from './styles';
import { SafeImage } from '../SafeImage';
import nice_duck from "@/assets/img/patro_transformed.png";
import { PageContext } from '@/context/pageContext';


export const Introduction = ({ }): ReactElement => {
  const { userId } = useContext(PageContext);
  return (
    <Styled.Container>
      <div className='lg:flex lg:flex-nowrap w-full justify-center sm:flex sm:flex-wrap items-center'>
        <SafeImage src={nice_duck} text='boas vindas!' />
        <div className='sm:w-4/5 md:w-2/3' >
          <h1 id="title">Boas vindas ao Estudas!</h1>
          <h3 className='!font-montserrat'>
            Seja bem-vindo (a) ao Estudas, o seu portal definitivo para aprender os fundamentos da programação usando a linguagem de programação C.
            Nosso objetivo é fornecer a você as ferramentas e o conhecimento necessários para dominar uma das linguagens de programação mais poderosas e influentes da história.
            Nossos cursos são projetados para todos os níveis, desde iniciantes até programadores experientes que desejam aprimorar suas habilidades.
            Com tutoriais e exercícios detalhados, garantimos que você terá uma experiência de aprendizado completa e enriquecedora.
            Comece agora mesmo fazendo login e entrando na aba “Cursos”!
          </h3>
          {
              !userId && <div style={{ width: "100%",marginTop:"12px",fontWeight:"600" }}>Faça login para salvar seu progresso</div>
          }
        </div>
      </div>
    </Styled.Container>
  );
};