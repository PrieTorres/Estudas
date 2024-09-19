import { Section } from "@/components/Section";
import { CourseCard } from "@/components/Course";
import { getApiURL } from "@/lib/helper";
import { LoadedDataCourse } from "@/types/course";

const CoursesPage = async () => {
  const url = getApiURL() + "/api/courses/";
  const data = await fetch(url); // http://localhost:3000
  const courses = await data.json();
  
  return (
    <div>
      <Section type="flex-list">
        {courses.map((courseMetadata: LoadedDataCourse, i:number) =>
          <div key={`${courseMetadata._id}_${i}`}>
            <CourseCard
              course={courseMetadata}
              title={courseMetadata.title}
              progress={courseMetadata.progress}
            />
          </div>)
        }
      </Section>
    </div>
  );
};

export default CoursesPage;