import { ReactElement } from 'react';
import { Container } from './styles';
import { LabelButton } from '../LabelButton';

interface QuestionBoxProps {
  question: string;
  response: string;
  options: Array<string>;
  type: string;
  onClickOpt: CallableFunction;
  answeredMetadata?: {
    clicked: string;
    answer: string;
    isCorrect: boolean;
  }
}

export const QuestionBox = ({ question, response, options, onClickOpt, answeredMetadata = {} }: QuestionBoxProps): ReactElement => {
  const {clicked, answer, isCorrect} = answeredMetadata;

  return (
    <Container>
      <h2>{question}</h2>
      <div>
        {options.map((opt) => (
          <div>
            <LabelButton 
              label={opt} 
              onClick={() => onClickOpt(opt)} 
              classname={opt === answer && opt === clicked ? "correct" : opt === clicked ? "wrong" : ""}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};