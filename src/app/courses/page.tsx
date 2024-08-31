import { Section } from "@/components/Section";
import { courses } from "@/app/courses/metadata";
import { Course } from "@/components/Course";

const CoursesPage = () => {

  return (
    <div>
      <Section>
        {courses.map((courseMetadata) =>
          <Course
            course={courseMetadata}
            title={courseMetadata.title}
            progress={courseMetadata.progress}
          />)
        }
      </Section>
    </div>
  );
};

export default CoursesPage;