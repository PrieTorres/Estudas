'use client';

import { Section } from "@/components/Section";
import { CourseCard } from "@/components/Course";
import { LoadedDataCourse } from "@/types/course";
import { useContext } from "react";
import { LoadingSection } from "@/components/LoadingSection";
import { PageContext } from "@/context/pageContext";

const CoursesPage = () => {
  try {
    const { loading, courseList: courses } = useContext(PageContext);

    return (
      <div>
        <Section type="flex-list">
          {
            !courses?.length && loading &&
            <LoadingSection />
          }
          {courses?.filter(course => !course.hide).sort((a, b) => a.title < b.title ? -1 : 1).map((courseMetadata: LoadedDataCourse, i: number) =>
            <div key={`${courseMetadata._id}_${i}`} >
              <CourseCard
                course={courseMetadata}
                title={courseMetadata.title}
                hideProgress={true}
              />
            </div>)
          }
        </Section>
      </div>
    );
  } catch (error) {
    console.error("unable to fetch courses", error);
    return (<div>some error happened while trying to list courses</div>);
  }
};

export default CoursesPage;