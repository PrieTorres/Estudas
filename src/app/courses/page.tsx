import { Section } from "@/components/Section";
import { CourseCard } from "@/components/Course";
import { getApiURL } from "@/lib/helper";
import { LoadedDataCourse } from "@/types/course";

const CoursesPage = async () => {
  try {
    const data = await fetch(`${getApiURL()}/api/courses`);
    const courses = await data.json();
    return (
      <div>
        <Section type="flex-list">
          {courses.map((courseMetadata: LoadedDataCourse, i: number) =>
            <div key={`${courseMetadata._id}_${i}`} >
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
  } catch (error) {
    console.error("unable to fetch courses", error);
    return (<div>some error happened while trying to list courses</div>);
  }
};

export default CoursesPage;