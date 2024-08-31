"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReactElement } from 'react';
import { Container } from './styles';

export const CoursePage = ({ params }): ReactElement => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [courseData, setCourseData] = useState({});

  console.log("CoursePage  --> ",params)

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`/api/courses/${params?.id}`);
      const data = await response.json();

      console.log("dtattattatata --> ",data)

      setCourseData(data);
    };

    if (params?.id) fetchCourses();
  }, [params.id]);

  return(
    <Container>
      {courseData?.content}
    </Container>
  )
};