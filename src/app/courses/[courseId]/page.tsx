"use client";

import { useEffect, useState } from "react";
import { ReactElement } from 'react';
import { Container } from './styles';

const CoursePage = ({ params }): ReactElement => {
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`/api/courses/${params?.courseId}`);
      const data = await response.json();

      setCourseData(data);
    };

    if (params?.courseId) fetchCourses();
  }, [params.courseId]);

  return (
    <Container
      dangerouslySetInnerHTML={{ __html: (courseData?.html ?? "") }}
    />
  );
};

export default CoursePage;