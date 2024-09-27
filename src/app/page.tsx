"use client";

import { Section } from "@/components/Section";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LoadingSection } from "@/components/LoadingSection";
import { CourseCard } from "@/components/Course";
import { ProgressCourse } from "@/types/progressCourse";
import { UserSession } from "@/types/userSession";
import { LoadedDataCourse } from "@/types/course";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";
import "@/i18n";

interface HomePageProps {
  email?: string;
}

export default function Home({ email }: HomePageProps) {
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

  const router = useRouter();
  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/login");
  }

  return (
    <div>
      <h1 className="text-xl mb-4">Super secure home page</h1>
      <p className="mb-8">
        Only <strong>{email}</strong> holds the magic key to this kingdom!
      </p>
      <button
        onClick={handleLogout}
        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
      >
        Logout
      </button>
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
