"use client";

import { Section } from "@/components/Section";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { LoadingSection } from "@/components/LoadingSection";
import { CourseCard } from "@/components/Course";
import { ProgressCourse } from "@/types/progressCourse";
import { LoadedDataCourse } from "@/types/course";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserByFirebaseUserId } from "@/lib/helper";

export default function Home() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [coursesInProgress, setCoursesInProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);

      const userMongo = await getUserByFirebaseUserId({ firebaseUserId: user?.uid ?? "", createUser: true, userData: user });

      try {
        const data = await fetch(`/api/progressCourse/${userMongo?._id ?? userMongo?.id ??""}`);
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
          <Section>
            <div>
              {
                !user ? "faça login para salvar seu progresso" : 
                coursesInProgress?.length > 0 ? "cursos em andamento" : "nenhum curso em andamento :("
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
