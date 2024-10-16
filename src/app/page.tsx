"use client";

import { Section } from "@/components/Section";
import { useContext, useEffect, useState } from "react";
import { auth } from "@/firebase";
import { LoadingSection } from "@/components/LoadingSection";
import { CourseCard } from "@/components/Course";
import { ProgressCourse } from "@/types/progressCourse";
import { LoadedDataCourse } from "@/types/course";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserByFirebaseUserId } from "@/lib/helper";
import { User } from "firebase/auth";
import { PageContext } from "@/context/pageContext";

interface UserAuth extends User {
  _id: string;
}

export default function Home() {
  const [user] = useAuthState(auth) as [UserAuth | null, boolean, Error | undefined];
  const [loading, setLoading] = useState(true);
  const [coursesInProgress, setCoursesInProgress] = useState<ProgressCourse[]>([]);
  const { userId, updateSessionId } = useContext(PageContext);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);

      let userMongo = null;



      try {
        if (!user?._id && !userId) {
          userMongo = await getUserByFirebaseUserId({ firebaseUserId: user?.uid ?? "", createUser: true, userData: user });
          if (typeof updateSessionId == "function") updateSessionId(userMongo?._id ?? userMongo?.id ?? "");
        }

        console.log("fetching progress", userId ?? userMongo?._id ?? userMongo?.id ?? "");
        const data = await fetch(`/api/progressCourse/${userId ?? userMongo?._id ?? userMongo?.id ?? ""}`);
        const savedProgress = await data.json();

        if (Array.isArray(savedProgress)) {
          setCoursesInProgress(savedProgress as Array<never>);
        } else setCoursesInProgress([]);
      } catch (error) {
        console.error("unable to fetch progress", error);
      }

      setLoading(false);
    };

    if (user) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div>
      {
        loading ?
          <LoadingSection />
          :
          <Section type="flex-list">
            <div style={{ width: "100%" }}>
              {
                !user ? "faça login para salvar seu progresso" :
                  coursesInProgress?.length > 0 ? "cursos em andamento" : "nenhum curso em andamento :("
              }
            </div>
            {
              coursesInProgress.filter(prgDat => typeof prgDat.courseId === 'object' && !prgDat.courseId.hide).map((progressData, i) => (
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
          </Section>
      }
    </div>
  );
}
