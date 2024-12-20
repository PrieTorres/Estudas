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
  response?: string;
  options: Array<string>;
  type: string;
  onClickOpt: CallableFunction;
  answeredMetadata?: AnsweredMetadata | null | undefined;
  disabled?: boolean;
  explanation: string | undefined;
}

export const QuestionBox = ({ question, options, onClickOpt, answeredMetadata = {}, disabled, type,explanation }: QuestionBoxProps): ReactElement => {
  function answerClassNames(opt: string, answeredMetadata: AnsweredMetadata) {
    const { clicked, answer } = answeredMetadata;

    if (clicked == opt) {
      if (clicked == answer) {
        return "correct";
      } else {
        return "wrong";
      }
    } 

    if (opt == answer){
      return "correct-option";
    }

    return "";
  }

  return (
    <Container >
      {type == "quiz_html" ?
        <div dangerouslySetInnerHTML={{ __html: question }} /> :
        <h2 className='!font-montserrat py-16'>{question}</h2>
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
        {
          answeredMetadata?.clicked!=answeredMetadata?.answer ?
          <div>
            <div>A resposta é:</div>
            {explanation}
          </div> 
            : <></>
        }
        
      </div>
    </Container>
  );
};