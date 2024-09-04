"use client";

import { Carousel } from "@/components/Carousel";
import { Section } from "@/components/Section";
import { getApiURL } from "@/lib/helper";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoadingSection } from "@/components/LoadingSection";

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [coursesInProgress, setCoursesInProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const data = await fetch(`/api/progressCourse/${session?.user?.id}`);
      const savedProgress = await data.json();

      console.log(savedProgress);
      if (Array.isArray(savedProgress)) {
        setCoursesInProgress(savedProgress);
      } else setCoursesInProgress([]);
      setLoading(false);
    };

    if (session?.user?.id) fetchProgress();
  }, [session?.user?.id]);

  return (
    <div>
      {
        loading ?
          <LoadingSection />
          :
          <Section>
            <div>
              cursos em andamento
            </div>
          </Section>
      }
    </div>
  );
}
