'use client';

import { Section } from "@/components/Section";
import { CourseCard } from "@/components/Course";
import { getApiURL } from "@/lib/helper";
import { LoadedDataCourse } from "@/types/course";
import { useEffect, useState } from "react";
import { LoadingSection } from "@/components/LoadingSection";

const CoursesPage = () => {
  try {
    const [courses, setCourses] = useState<LoadedDataCourse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await fetch(`${getApiURL()}/api/courses`);
        const courses: LoadedDataCourse[] = await data.json();
        setCourses(courses);
      } catch (err) {
        console.error("An error occurred while fetching courses", err);
        setCourses([]);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchCourses();
    }, []);

    return (
      <div className="w-[100%] flex justify-center">
        <div className="w-[58%] flex flex-wrap justify-center" >
          <Section type="flex-list">
            {
              !courses.length && loading &&
              <LoadingSection />
            }
            {courses.filter(course => !course.hide).sort((a, b) => a.title < b.title ? -1 : 1).map((courseMetadata: LoadedDataCourse, i: number) =>
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
      </div>
    );
  } catch (error) {
    console.error("unable to fetch courses", error);
    return (<div>some error happened while trying to list courses</div>);
  }
};

export default CoursesPage;