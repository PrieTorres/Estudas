"use client";

import { Section } from "@/components/Section";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LoadingSection } from "@/components/LoadingSection";
import { CourseCard } from "@/components/Course";
import { ProgressCourse } from "@/types/progressCourse";
import { UserSession } from "@/types/userSession";
import { LoadedDataCourse } from "@/types/course";

export default function Home() {
  const { data: session } = useSession() as { data: UserSession | null; };
  const [loading, setLoading] = useState(true);
  const [coursesInProgress, setCoursesInProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      const data = await fetch(`/api/progressCourse/${session?.user?.id}`);
      const savedProgress = await data.json();

      if (Array.isArray(savedProgress)) {
        setCoursesInProgress(savedProgress as Array<never>);
      } else setCoursesInProgress([]);

      setLoading(false);
    };

    if (session?.user?.id) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [session?.user?.id]);

  return (
    <div>
      {
        loading ?
          <LoadingSection />
          :
          <Section>
            <div>
              {
                !session?.user?.id ?
                  "faça login para salvar seu progresso" : "cursos em andamento"
              }
              {
                coursesInProgress.map((progressData: ProgressCourse, i) => (
                  <div key={`${progressData?._id}_${i}`}>
                    {typeof progressData.courseId === 'object' && (
                      <CourseCard
                        title={progressData.courseId?.title}
                        progress={progressData.progress}
                        course={progressData.courseId as LoadedDataCourse}
                      />
                    )}
                  </div>
                ))
              }
            </div>
          </Section>
      }
    </div>
  );
}
