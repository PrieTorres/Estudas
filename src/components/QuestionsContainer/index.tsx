"use client";

import { ReactElement, useCallback, useState } from 'react';
import { Container } from './styles';
import { ActivityStepCourse } from '@/types/activityStepCourse';
import { AnsweredMetadata, QuestionBox } from '../QuestionBox';
import { LabelButton } from '../LabelButton';
import { FillingDiv } from "@/components/FillingDiv";


interface QuestionsContainerProps {
  questions: Array<ActivityStepCourse>;
}

interface QuestResponse {
  [key: string]: AnsweredMetadata;
}

export const QuestionsContainer = ({ questions }: QuestionsContainerProps): ReactElement => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questResponses, setQuestResponses] = useState<QuestResponse>({});

  const handleAnswer = useCallback((userAnswer: string) => {
    const { answer, _id } = questions[questionIndex];
    const updatedResponses = {
      ...questResponses,
      [`${_id}`]: {
        clicked: userAnswer,
        answer: answer,
        isCorrect: answer === userAnswer
      }
    };

    setQuestResponses(updatedResponses);
  }, [questionIndex, questResponses, questions]);

  const getCorrectQuant = () => {
    let correct = 0;
    Object.values(questResponses).forEach(val => val.isCorrect ? correct++ : "");

    return correct;
  }

  const isAllAnswered = () => Object.values(questResponses).length == questions.length;

  const getPercentCorrect = () => {
    const quantCorrect = getCorrectQuant();
    
    if(quantCorrect <= 0) {
      return 0;
    }

    const dec = questions.length / quantCorrect;
    const percent = dec * 10;
    return percent.toFixed(2);
  }

  return (
    <Container>
      <h1>Questão {questionIndex + 1} de {questions.length}</h1>
      <QuestionBox
        question={questions[questionIndex].question}
        response={questions[questionIndex].answer}
        options={questions[questionIndex].options}
        type={questions[questionIndex].type}
        onClickOpt={handleAnswer}
        answeredMetadata={questResponses[questions[questionIndex]._id]}
        disabled={isAllAnswered()}
      />
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: 8, gap: 10 }}>
        {questionIndex > 0 ? (
          <LabelButton
            label='<- Pergunta anterior'
            onClick={() => setQuestionIndex(prev => prev - 1)}
          />
        ) : <FillingDiv />}
        {questResponses[questions[questionIndex]._id] && (questionIndex < questions.length - 1) ? (
          <LabelButton
            label='Próxima pergunta ->'
            onClick={() => setQuestionIndex(prev => prev + 1)}
          />
        ) : <FillingDiv />}
      </div>

      {
        isAllAnswered() &&
        <div>
          <p>Você acertou {getCorrectQuant()} de {questions.length}</p>
          <p>Sua porcentagem de acerto foi {getPercentCorrect()}%</p>
        </div>
      }
    </Container>
  );
};
