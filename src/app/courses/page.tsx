import { Section } from "@/components/Section";
import { courses } from "@/app/courses/metadata";
import { Course } from "@/components/Course";

const CoursesPage = () => {
  function openCourse(id: string | number) {
    
  }

  return (
    <div>
      <Section>
        {courses.map((courseMetadata) =>
          <Course
            title={courseMetadata.title}
            progress={courseMetadata.progress}
            //onClick={() => openCourse(courseMetadata.id)}
          />)
        }
      </Section>
    </div>
  );
};

export default CoursesPage;