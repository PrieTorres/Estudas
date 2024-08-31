"use client";

import { ReactElement, ReactNode } from 'react';
import * as Styled from './styles';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


interface CourseProps {
  title: string;
  progress: number;
  //onClick: CallableFunction;
  course: {
    _id: string | number;
    title: string;
    content: ReactNode | Element | string;
  };
};

export const Course = ({ title, progress, course }: CourseProps) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();


  const handleCourseClick = () => {

    //if (course._id === session?.user.id) return router.push("/profile");

   // router.push(`/course/${course._id}?title=${course.title}`);
    router.push(`/course/${course._id}`);
  };

  return (
    <Styled.Container onClick={handleCourseClick}>
      <h2>{title}</h2>
      <div>{progress} %</div>
      <div>{progress >= 100 ? "Concluído" : "Pendente"}</div>
    </Styled.Container>
  );
};