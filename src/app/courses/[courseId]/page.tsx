"use client";

import { getDataCourse } from '@/lib/helper';
import { Container } from './styles';
import { Course } from "@/types/course";

const CoursePage = async ({ params }: { params: { courseId: string | number; }; }) => {
  const course: Course = await getDataCourse({ courseId: params?.courseId });
  console.log(course)

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