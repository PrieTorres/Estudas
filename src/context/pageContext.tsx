import { LoadedDataCourse } from "@/types/course";
import { createContext, ReactNode, useMemo, useState } from "react";

interface PageContextProps {
  userId?: any;
  loading?: boolean;
  coursesInProgress?: any[];
  loadedCourse?: LoadedDataCourse;
  openCourse?: (courseData: LoadedDataCourse) => void;
  fetchProgress?: () => void;
  updateSessionId?: (userId: string) => void;
}

export const PageContext = createContext<PageContextProps>({});

export const PageProvider = ({ children }: { children: ReactNode; }) => {
  const [pageState, setPageState] = useState<PageContextProps>({});

  const updateSessionId = (userId: string) => {
    setPageState((prev) => ({ ...prev, userId }));
  }

  const openCourse = (courseData: LoadedDataCourse) => {
    setPageState((prev) => ({ ...prev, loadedCourse: courseData }));
  }

  const contextValue = useMemo(() => ({ ...pageState, updateSessionId, openCourse }), [pageState, updateSessionId, openCourse]);

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
};
