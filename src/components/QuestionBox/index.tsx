import { ReactElement } from 'react';
import { Container } from './styles';
import { LabelButton } from '../LabelButton';

export interface AnsweredMetadata {
  clicked?: string;
  answer?: string;
  isCorrect?: boolean;
}

export interface QuestionBoxProps {
  question: string;
  response: string;
  options: Array<string>;
  type: string;
  onClickOpt: CallableFunction;
  answeredMetadata?: AnsweredMetadata | null | undefined;
  disabled?: boolean;
}

export const QuestionBox = ({ question, response, options, onClickOpt, answeredMetadata = {}, disabled, type }: QuestionBoxProps): ReactElement => {
  function answerClassNames(opt: string, answeredMetadata: AnsweredMetadata) {
    const { clicked, answer } = answeredMetadata;

    if (clicked == opt) {
      if (clicked == answer) {
        return "correct";
      } else {
        return "wrong";
      }
    }

    return "";
  }

  return (
    <Container>
      {type == "quiz_html" ?
        <div dangerouslySetInnerHTML={{ __html: question }} /> :
        <h2>{question}</h2>
      }
      <div>
        {options.map((opt, i) => (
          <div key={`opcao-${i}`}>
            <LabelButton
              label={opt}
              onClick={() => onClickOpt(opt)}
              className={answerClassNames(opt, (answeredMetadata ?? {}))}
              disabled={answeredMetadata?.clicked != undefined || disabled}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};