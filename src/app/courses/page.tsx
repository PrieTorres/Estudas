import { Section } from "@/components/Section";
import { courses } from "@/app/courses/metadata";
import { Course } from "@/components/Course";

const CoursesPage = () => {

  return (
    <div>
      <Section>
        {courses.map((courseMetadata, i) =>
          <div key={`${courseMetadata.id??courseMetadata._id}_${i}`}>
            <Course
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