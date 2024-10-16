import { updateCourseProgress } from "@/lib/helper";
import { LoadedDataCourse } from "@/types/course";
import { createContext, ReactNode, useMemo, useState } from "react";

interface PageContextProps {
  userId?: any;
  loading?: boolean;
  coursesInProgress?: any[];
  loadedCourse?: LoadedDataCourse;
  openCourse?: (courseData: LoadedDataCourse) => void;
  updateCourse?: (courseData: LoadedDataCourse, fetch?: boolean) => void;
  fetchProgress?: () => void;
  updateSessionId?: (userId: string) => void;
}

export const PageContext = createContext<PageContextProps>({});

export const PageProvider = ({ children }: { children: ReactNode; }) => {
  const [pageState, setPageState] = useState<PageContextProps>({});

  const updateSessionId = (userId: string) => {
    setPageState((prev) => ({ ...prev, userId }));
  };

  const openCourse = (courseData: LoadedDataCourse) => {
    setPageState((prev) => ({ ...prev, loadedCourse: courseData }));
  };

  const updateCourse = (courseData: LoadedDataCourse, fetch?: boolean) => {
    let course = { ...pageState.loadedCourse, ...courseData };
    course.stepsDone = course.stepsDone?.filter((step) => course.steps?.find((s) => s._id === step));

    if (fetch) {
      updateCourseProgress({
        userId: pageState.userId,
        courseId: course._id,
        progress: course.progress ?? 0,
        stepsDone: course.stepsDone,
        activitiesDone: course.activitiesDone,
        score: course.score
      });
    }

    setPageState((prev) => ({ ...prev, loadedCourse: courseData }));
  };

  const contextValue = useMemo(() => ({ ...pageState, updateSessionId, openCourse, updateCourse }), [pageState, updateSessionId, openCourse, updateCourse]);

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
};
