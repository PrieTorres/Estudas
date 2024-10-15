"use client";

import { getDataCourse, updateCourseProgress } from '@/lib/helper';
import { Container } from './styles';
import { LoadedDataCourse } from "@/types/course";
import { useContext, useEffect, useState } from 'react';
import { StepsVisualizer } from '@/components/StepsVisualizer';
import { IconButton } from '@/components/IconButton';
import { Section } from '@/components/Section';
import { QuestionsContainer } from '@/components/QuestionsContainer';
import { FillingDiv } from "@/components/FillingDiv";
import { PageContext } from '@/context/pageContext';

const CoursePage = async ({ params }: { params: { courseId: string | number; }; }) => {
  const [course, setCourse] = useState<LoadedDataCourse>({
    title: "",
    steps: [],
    _id: ""
  });
  const [step, setStep] = useState<number>(0);
  const { userId, openCourse } = useContext(PageContext);

  useEffect(() => {
    async function loadCourse() {
      const data: LoadedDataCourse = await getDataCourse({ courseId: params?.courseId, userId });
      setCourse(data);
      if (openCourse) openCourse(data);
    }

    if (params.courseId) loadCourse();
  }, [params.courseId]);

  const handleClickStep = (i: number) => {
    const idStep = `${course?.steps[i]?._id}`;
    const courseData = course;

    if (!course.stepsDone?.includes(idStep) && userId) {
      if (Array.isArray(courseData.stepsDone)) {
        courseData.stepsDone.push(idStep);
      } else {
        courseData.stepsDone = [idStep];
      }

      courseData.progress = (courseData.stepsDone.length / courseData.steps.length) * 100;
      updateCourseProgress({
        userId: userId,
        courseId: courseData._id,
        progress: courseData.progress,
        stepsDone: courseData.stepsDone
      });

      setCourse(courseData);
      if (openCourse) openCourse(courseData);
    }

    setStep(i);
  };

  const steps = course?.steps?.sort((a, b) => a?.order - b?.order);

  return (
    <div style={{ padding: 10 }}>
      <Section>
        {steps.length > 1 ?
          <StepsVisualizer
            stepQuantity={steps.length}
            currentStep={step}
            onClickStep={handleClickStep}
          />
          : undefined
        }
        {
          course?.steps[step]?.content ? <Section>
            <Container
              dangerouslySetInnerHTML={{ __html: (course?.steps[step]?.content ?? "") }}
            />
          </Section> : undefined
        }
        {
          Array.isArray(course?.steps[step]?.questions) && course?.steps[step]?.questions?.length ?
            <Section>
              <h1>Hora de praticar!</h1>
              <QuestionsContainer
                questions={course?.steps[step]?.questions}
              />
            </Section>
            : undefined
        }
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 40px" }}>
          {
            step > 0 && steps.length > 1 ?
              <IconButton
                icon="arrow_back"
                onClick={() => handleClickStep(step - 1)}
              />
              : <FillingDiv />
          }
          {
            step < (steps.length - 1) && steps.length > 1 ?
              <IconButton
                icon="arrow_forward"
                onClick={() => handleClickStep(step + 1)}
              />
              : <FillingDiv />
          }
        </div>
      </Section>
    </div>
  );
};

export default CoursePage;