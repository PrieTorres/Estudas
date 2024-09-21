"use client";

import { ReactNode } from 'react';
import * as Styled from './styles';
import { useRouter } from "next/navigation";
import { LoadedDataCourse } from '@/types/course';
import { saveUpdateCourseProgress } from '@/lib/helper';
import { useSession } from "next-auth/react";
import { UserSession } from '@/types/userSession';

interface CourseProps {
  title: string;
  progress?: number;
  course: LoadedDataCourse
};

export const CourseCard = ({ title, progress, course }: CourseProps): ReactNode => {
  const router = useRouter();
  const { data: session } = useSession() as { data: UserSession | null };

  const handleCourseClick = () => {
    if ((!course.progress || course.progress == 0) && session?.user?.id) {
      saveUpdateCourseProgress({
        userId: session?.user?.id,
        courseId: course._id,
        progress: 1
      }).then(() => {
        router.push(`/courses/${course._id}`);
      });
    } else {
      router.push(`/courses/${course._id}`);
    }
  };

  return (
    <Styled.Container onClick={handleCourseClick}>
      <h2>{title}</h2>
      {typeof progress == "number" ?
        <div>
          <div>{progress} %</div>
          <div>{progress >= 100 ? "Concluído" : "Pendente"}</div>
        </div>
        :
        <div>Não iniciado</div>
      }
    </Styled.Container>
  );
};