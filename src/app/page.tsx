"use client";

import { Section } from "@/components/Section";
import { useContext } from "react";
import { LoadingSection } from "@/components/LoadingSection";
import { CourseCard } from "@/components/Course";
import { LoadedDataCourse } from "@/types/course";
import { PageContext } from "@/context/pageContext";
import { Introduction } from "@/components/Introduction";

export default function Home() {
  const { loading, coursesInProgress, user } = useContext(PageContext);

  return (
    <div>
      {
        loading ?
          <LoadingSection />
          :
          <Section type="flex-list">
            <div style={{ width: "100%" }}>
              {
                !user ?
                  <div>
                    <Introduction />
                    faça login para salvar seu progresso
                  </div> :
                  coursesInProgress?.length ?
                    "cursos em andamento" :
                    <div>
                      <Introduction />
                      nenhum curso em andamento ;(
                    </div>
              }
            </div>
            {
              coursesInProgress?.filter(prgDat => typeof prgDat.courseId === 'object' && !prgDat.courseId.hide && prgDat.progress < 100)
                .sort((a, b) => {
                  if (typeof a.courseId === 'object' && typeof b.courseId === 'object') {
                    return a.courseId.title < b.courseId.title ? -1 : 1;
                  }
                  return 0;
                })
                .map((progressData, i) => (
                  <div key={`${progressData?._id}_${i}`}>
                    {typeof progressData.courseId === 'object' && (
                      <CourseCard
                        title={progressData.courseId?.title}
                        progress={progressData.progress}
                        course={progressData.courseId as LoadedDataCourse}
                        score={progressData.score}
                      />
                    )}
                  </div>
                ))
            }
          </Section>
      }
    </div>
  );
}
