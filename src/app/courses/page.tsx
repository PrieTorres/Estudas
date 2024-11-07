"use client";

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
        <Section>
          {/* Show loading indicator if courses are still loading */}
          {!courses?.length && loading?.loadingCourses && <LoadingSection />}

          {/* Display courses in the order they appear in the list */}
          {courses
            ?.filter((course) => !course.hide)
            .map((courseMetadata: LoadedDataCourse, i: number) => (
              <div key={`${courseMetadata._id}_${i}`} style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <CourseCard
                  course={courseMetadata}
                  title={courseMetadata.title}
                  hideProgress={false}
                />
                {/* Spacer to create roadmap effect */}
                {i < courses.length - 1 && !courses[i + 1].hide && (
                  <div
                    style={{
                      height: "60px",
                      borderLeft:courseMetadata.progress === 100 ? "30px solid #4CAF50" : "30px solid #E0E0E0",
                      margin: "0 auto",
                      width: "2px",
                    }}
                  />
                )}
              </div>
            ))}
        </Section>
      </div>
    );
  } catch (error) {
    console.error("Unable to fetch courses", error);
    return <div>Some error happened while trying to list courses</div>;
  }
};

export default CoursesPage;
