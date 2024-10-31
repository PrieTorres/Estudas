"use client";

import { Section } from "@/components/Section";
import { useContext } from "react";
import { LoadingSection } from "@/components/LoadingSection";
import { CourseCard } from "@/components/Course";
import { LoadedDataCourse } from "@/types/course";
import { PageContext } from "@/context/pageContext";
import { Introduction } from "@/components/Introduction";

export default function Home() {
  const { loading, coursesInProgress, userId } = useContext(PageContext);

  return (
    <div>
      {
        loading?.loadingProgress || loading?.loadingAuth ?
          <LoadingSection />
          :
          <Section type="flex-list">
            <div style={{ width: "100%"}}>
              {
                coursesInProgress?.filter(prgDat => typeof prgDat.courseId === 'object' && !prgDat.courseId.hide)?.length ?
                  "cursos em andamento" :
                  <div>
                    <Introduction />
                  </div>
              }
            </div>
            {
              coursesInProgress?.filter(prgDat => typeof prgDat.courseId === 'object' && !prgDat.courseId.hide && (prgDat.progress < 100 || !userId))
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
            {
              !userId && <div style={{ width: "100%" }}>Faça login para salvar seu progresso</div>
            }
          </Section>
      }
    </div>
  );
}
