"use client";

import { ReactNode } from 'react';
import * as Styled from './styles';
import {  useRouter } from "next/navigation";
import { Course } from '@/types/course';


interface CourseProps {
  title: string;
  progress: number;
  course: Course
};

export const CourseCard = ({ title, progress, course }: CourseProps): ReactNode => {
  const router = useRouter();


  const handleCourseClick = () => {
    router.push(`/courses/${course._id}`);
  };

  return (
    <Styled.Container onClick={handleCourseClick}>
      <h2>{title}</h2>
      <div>{progress} %</div>
      <div>{progress >= 100 ? "Concluído" : "Pendente"}</div>
    </Styled.Container>
  );
};