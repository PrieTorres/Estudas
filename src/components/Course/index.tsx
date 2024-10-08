"use client";

import { ReactNode, useContext } from 'react';
import * as Styled from './styles';
import { useRouter } from "next/navigation";
import { LoadedDataCourse } from '@/types/course';
import { saveUpdateCourseProgress } from '@/lib/helper';
import { User } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/firebase";
import { PageContext } from '@/context/pageContext';

interface UserAuth extends User {
  _id: string;
} 

interface CourseProps {
  title: string;
  progress?: number;
  course: LoadedDataCourse
};

export const CourseCard = ({ title, progress, course }: CourseProps): ReactNode => {
  const router = useRouter();
  const [user] = useAuthState(auth) as [UserAuth | null, boolean, Error | undefined];
  const { userId } = useContext(PageContext);

  const handleCourseClick = () => {
    if ((!course.progress || course.progress == 0) && userId) {
      saveUpdateCourseProgress({
        userId: userId,
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