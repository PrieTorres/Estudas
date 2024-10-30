"use client";

import { ReactNode } from 'react';
import * as Styled from './styles';
import { useRouter } from "next/navigation";
import { LoadedDataCourse } from '@/types/course';
import { User } from "firebase/auth";

interface UserAuth extends User {
  _id: string;
}

interface CourseProps {
  title: string;
  progress?: number;
  course: LoadedDataCourse;
  score?: number;
  hideProgress?: boolean;
}

export const CourseCard = ({ title, progress, course, score, hideProgress }: CourseProps): ReactNode => {
  const router = useRouter();
  const scoreValue = score ?? course.score;

  const handleCourseClick = async () => {
    try {
      router.push(`/courses/${course._id}`);
    } catch (error) {
      console.error("Error handling course click:", error);
    }
  };

  return (
    <Styled.Container onClick={handleCourseClick}>
      <h2>{title}</h2>
      {typeof progress === "number" ? (
        <div>
          <div>{progress?.toFixed(2)} %</div>
          <div>{progress >= 100 ? "Concluído" : "Pendente"}</div>
          <div>{scoreValue != undefined ? `nota: ${scoreValue?.toFixed(2)}` : ""}</div>
        </div>
      ) : !hideProgress && (
        <div>Não iniciado</div>
      )}
    </Styled.Container>
  );
};