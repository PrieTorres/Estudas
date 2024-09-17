"use client";

import { ReactElement, useCallback, useState } from 'react';
import { Container } from './styles';
import { ActivityStepCourse } from '@/types/activityStepCourse';
import { QuestionBox } from '../QuestionBox';
import { LabelButton } from '../LabelButton';

interface QuestionsContainerProps {
  questions: Array<ActivityStepCourse>;
}

export const QuestionsContainer = ({ questions }: QuestionsContainerProps): ReactElement => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questResponses, setQuestResponses] = useState({});

  const handleAnswer = useCallback((answer) => {
    const { response, _id } = questions[questionIndex];
    questResponses[_id] = {
      clicked: answer,
      answer: response,
      isCorrect: response == answer
    };

    setQuestResponses(questResponses);

  }, [questionIndex, questResponses]);

  return (
    <Container>
      <h1>Questão {questionIndex + 1} de {questions.length}</h1>
      <QuestionBox
        question={questions[questionIndex].question}
        response={questions[questionIndex].response}
        options={questions[questionIndex].options}
        type={questions[questionIndex].type}
        onClickOpt={handleAnswer}
        answeredMetadata={questResponses[questions[questionIndex]._id]}
      />
      {questionIndex > 0 ?
        <LabelButton 
          label='Pergunta anterior'
          onClick={() => setQuestionIndex(prev => prev - 1)}
        />
        : undefined}
      {questResponses[questions[questionIndex]._id] && (questionIndex - 1 < questions.length) ?
        <LabelButton
          label='Próxima pergunta'
          onClick={() => setQuestionIndex(prev => prev + 1)}
        />
        : undefined
      }
    </Container>
  );
};