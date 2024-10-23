"use client";

import { Section } from "@/components/Section";
import { useContext } from "react";
import { LoadingSection } from "@/components/LoadingSection";
import { User } from "firebase/auth";
import { PageContext } from "@/context/pageContext";
import { CertifiedCourse } from "@/components/CertifiedCourse";

interface UserAuth extends User {
  _id: string;
}

export default function Profile() {
  const { coursesInProgress, loading } = useContext(PageContext);

  return (
    <div>
      {
        loading?.loadingProgress || loading?.loadingAuth ?
          <LoadingSection />
          :
          <Section type="flex-list">
            {
              coursesInProgress?.filter(prgDat => typeof prgDat.courseId === 'object' && !prgDat.courseId.hide && prgDat.progress >= 100)
              .sort((a, b) => {
                if (typeof a.courseId === 'object' && typeof b.courseId === 'object') {
                  return a.courseId.title < b.courseId.title ? -1 : 1;
                }
                return 0;
              })
              .map((progressData, i) => (
                <div key={`${progressData?._id}_${i}`}>
                  {typeof progressData.courseId === 'object' && (
                    <CertifiedCourse 
                      title={progressData.courseId?.title}
                      score={progressData.score ?? 0}
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
