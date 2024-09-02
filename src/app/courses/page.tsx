import { Section } from "@/components/Section";
import { CourseCard } from "@/components/Course";
import { getApiURL } from "@/lib/helper";
import { Course } from "@/types/course";

const CoursesPage = async () => {
  const data = await fetch(getApiURL() + "/api/courses/"); // http://localhost:3000
  const courses = await data.json();
  return (
    <div>
      <Section>
        {courses.map((courseMetadata: Course, i:number) =>
          <div key={`${courseMetadata.id ?? courseMetadata._id}_${i}`}>
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