"use client";

import { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Container } from './styles';
import { ActivityStepCourse } from '@/types/activityStepCourse';
import { AnsweredMetadata, QuestionBox } from '../QuestionBox';
import { LabelButton } from '../LabelButton';
import { FillingDiv } from "@/components/FillingDiv";
import { PageContext } from '@/context/pageContext';
import { ActivitiesDone as ActivitiesDoneType } from '@/types/progressCourse';

interface QuestionsContainerProps {
  questions: Array<ActivityStepCourse>;
  activitiesDone?: Array<ActivitiesDoneType>;
}

interface QuestResponse {
  [key: string]: AnsweredMetadata;
}

export const QuestionsContainer = ({ questions, activitiesDone }: QuestionsContainerProps): ReactElement => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questResponses, setQuestResponses] = useState<QuestResponse>({});
  const { loadedCourse, updateCourse } = useContext(PageContext);

  const handleAnswer = useCallback((userAnswer: string) => {
    const { answer, _id } = questions[questionIndex];
    const updatedResponses = {
      ...questResponses,
      [_id]: {
        clicked: userAnswer,
        answer: answer,
        isCorrect: answer === userAnswer
      }
    };

    if (loadedCourse && typeof updateCourse === "function") {
      const activitiesDone = Object.keys(updatedResponses).map(key => ({
        activityId: key,
        answer: updatedResponses[key].clicked ?? ""
      }));

      if (Array.isArray(loadedCourse.activitiesDone)) {
        const filteredActivities = loadedCourse.activitiesDone.filter(
          (activity) => !activitiesDone.find((act) => act.activityId === activity.activityId)
        );
        activitiesDone.push(...filteredActivities.map(activity => ({
          activityId: activity.activityId,
          answer: activity.answer
        })));
      }

      loadedCourse.activitiesDone = activitiesDone;
      updateCourse(loadedCourse);
    }

    setQuestResponses(updatedResponses);
  }, [questionIndex, questResponses, questions, loadedCourse, updateCourse]);

  const getCorrectQuant = useCallback(() => {
    return Object.values(questResponses).reduce((count, val) => val.isCorrect ? count + 1 : count, 0);
  }, [questResponses]);

  const isAllAnswered = useMemo(() => Object.values(questResponses).length === questions.length, [questResponses, questions.length]);

  const getPercentCorrect = useCallback(() => {
    const quantCorrect = getCorrectQuant();
    return quantCorrect > 0 ? ((quantCorrect / questions.length) * 100).toFixed(2) : "0";
  }, [getCorrectQuant, questions.length]);

  useEffect(() => {
    if (activitiesDone) {
      const newQuestResponses: QuestResponse = { ...questResponses };
      activitiesDone.forEach(({ activityId, answer }) => {
        const question = questions.find(({ _id }) => _id === activityId);
        if (question) {
          newQuestResponses[activityId] = {
            clicked: answer,
            answer: question.answer,
            isCorrect: answer === question.answer
          };
        }
      });

      setQuestResponses(newQuestResponses);
    }
  }, [activitiesDone]);

  useEffect(() => {
    if (isAllAnswered && loadedCourse && typeof updateCourse === "function") {
      const oldScore = loadedCourse.score ?? 0;
      loadedCourse.score = parseFloat(getPercentCorrect());
      if (loadedCourse.score !== oldScore) {
        updateCourse(loadedCourse, true);
      }
    }
  }, [isAllAnswered, questResponses, loadedCourse, updateCourse, getPercentCorrect]);

  return (
    <Container>
      <h1>Questão {questionIndex + 1} de {questions.length}</h1>
      <QuestionBox
        question={questions[questionIndex].question}
        explanation={questions[questionIndex].explanation}
        response={questions[questionIndex].answer}
        options={questions[questionIndex].options}
        type={questions[questionIndex].type}
        onClickOpt={handleAnswer}
        answeredMetadata={questResponses[questions[questionIndex]._id]}
        disabled={isAllAnswered}
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

      {isAllAnswered && (
        <div>
          <p>Você acertou {getCorrectQuant()} de {questions.length}</p>
          <p>Sua porcentagem de acerto foi {getPercentCorrect()}%</p>
        </div>
      )}
    </Container>
  );
};
