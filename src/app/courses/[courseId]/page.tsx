"use client";

import { Container } from './styles';
import { Course } from "@/types/course";

const CoursePage = async ({ params }: { params: { courseId: string | number } }) => {
  const data = await fetch(`/api/courses/${params?.courseId}`);
  const course: Course = await data.json();

  /**
   * Courses page precisa ser client component para lidar com possíveis
   * eventos onclick que podem estar inclusos no html herdado 
   */

  return (
    <Container
      dangerouslySetInnerHTML={{ __html: (course?.html ?? "") }}
    />
  );
};

export default CoursePage;