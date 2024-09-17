"use client";

import { getDataCourse } from '@/lib/helper';
import { Container } from './styles';
import { LoadedDataCourse } from "@/types/course";
import { useEffect, useState } from 'react';
import { StepsVisualizer } from '@/components/StepsVisualizer';
import { IconButton } from '@/components/IconButton';
import { Section } from '@/components/Section';
import { QuestionsContainer } from '@/components/QuestionsContainer';

const CoursePage = async ({ params }: { params: { courseId: string | number; }; }) => {
  const [course, setCourse] = useState<LoadedDataCourse>({
    title: "",
    steps: [],
    _id: ""
  });
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    async function loadCourse() {
      const data: LoadedDataCourse = await getDataCourse({ courseId: params?.courseId });
      setCourse(data);
    }

    if (params.courseId) loadCourse();
  }, [params.courseId]);

  const steps = course?.steps?.sort((a, b) => a?.order - b?.order);

  const fillingDiv = () => <div style={{ display: 'block', width: 40, height: 40, opacity: 0 }}></div>;

  console.log(course?.steps[step]?.questions);
  return (
    <div style={{ padding: 10 }}>
      <Section>
        {steps.length > 1 ?
          <StepsVisualizer
            stepQuantity={steps.length}
            currentStep={step}
            onClickStep={(i: number) => setStep(i)}
          />
          : undefined
        }
        {
          course?.steps[step]?.content ? <Container
            dangerouslySetInnerHTML={{ __html: (course?.steps[step]?.content ?? "") }}
          /> : undefined
        }
        {
           course?.steps[step]?.questions?.length &&
           <QuestionsContainer
             questions={course?.steps[step]?.questions}
           />
        }
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 40px" }}>
          {
            step > 0 && steps.length > 1 ?
              <IconButton
                icon="arrow_back"
                onClick={() => setStep(prev => prev - 1)}
              />
              : fillingDiv()
          }
          {
            step < (steps.length - 1) && steps.length > 1 ?
              <IconButton
                icon="arrow_forward"
                onClick={() => setStep(prev => prev + 1)}
              />
              : fillingDiv()
          }
        </div>
      </Section>
    </div>
  );
};

export default CoursePage;