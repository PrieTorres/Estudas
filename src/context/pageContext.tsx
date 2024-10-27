import { fetchTk, getApiURL, getUserByFirebaseUserId, updateCourseProgress } from "@/lib/helper";
import { LoadedDataCourse } from "@/types/course";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from "firebase/auth";
import { auth } from "@/firebase";
import { ProgressCourse } from "@/types/progressCourse";

interface UserAuth extends User {
  _id: string;
}

interface PageContextProps {
  user?: UserAuth | null;
  userId?: any;
  loading?: {
    loadingAuth?: boolean;
    loadingProgress?: boolean;
    loadingCourses?: boolean;
  };
  coursesInProgress?: ProgressCourse[];
  courseList?: LoadedDataCourse[];
  loadedCourse?: LoadedDataCourse;
  sessionRestored?: boolean;
  openCourse?: (courseData: LoadedDataCourse) => void;
  updateCourse?: (courseData: LoadedDataCourse, fetch?: boolean) => void;
  fetchProgress?: () => void;
  updateSessionId?: (userId: string) => void;
  refreshProgress?: () => void;
  refreshCourses?: () => void;
}

const SESSION_TIMEOUT_HOURS = 2;

const getHoursDifference = (oldTimestamp: number, newTimestamp: number) => {
  return (newTimestamp - oldTimestamp) / (1000 * 60 * 60);
};

const checkSessionExpiration = () => {
  const sessionTimestamp = sessionStorage.getItem("sessionTimestamp");

  if (sessionTimestamp) {
    const currentTime = new Date().getTime();
    const sessionTime = parseInt(sessionTimestamp);

    const hoursDifference = getHoursDifference(sessionTime, currentTime);

    if (hoursDifference >= SESSION_TIMEOUT_HOURS) {
      sessionStorage.clear();
      sessionStorage.setItem("sessionTimestamp", currentTime.toString());
    }
  } else {
    sessionStorage.setItem("sessionTimestamp", new Date().getTime().toString());
  }
};

export const PageContext = createContext<PageContextProps>({});

export const PageProvider = ({ children }: { children: ReactNode; }) => {
  const [user, loadingAuth] = useAuthState(auth) as [UserAuth | null, boolean, Error | undefined];
  const [pageState, setPageState] = useState<PageContextProps>({});

  useEffect(() => {
    if (!pageState.sessionRestored) {
      const sessionData = sessionStorage.getItem('pageState');

      const sessionState = sessionData ? { ...JSON.parse(sessionData), sessionRestored: true } : {
        user,
        loading: { loadingAuth, loadingProgress: false, loadingCourses: false },
        coursesInProgress: [],
        courseList: [],
        sessionRestored: true,
        ...pageState
      };

      setPageState(sessionState);
    }
  }, []);

  useEffect(() => {
    checkSessionExpiration();
    sessionStorage.setItem('pageState', JSON.stringify(pageState));
  }, [pageState]);

  const setCourses = (courseList: any[]) => setPageState((prev) => ({ ...prev, courseList }));
  const setCoursesInProgress = (coursesInProgress: any[]) => setPageState((prev) => ({ ...prev, coursesInProgress }));
  const setLoading = (loading: boolean, loadKey: "loadingAuth" | "loadingProgress" | "loadingCourses") => {
    setPageState((prev) => ({ ...prev, loading: { ...(prev.loading ?? {}), [loadKey]: loading } }));
  };

  const updateSessionId = (userId?: string) => {
    setPageState((prev) => ({ ...prev, userId }));
    if (userId) {
      fetchProgress(userId);
    } else {
      setCoursesInProgress([]);
    }
  };

  const openCourse = (courseData: LoadedDataCourse) => {
    setPageState((prev) => ({ ...prev, loadedCourse: courseData }));
    const coursesInProgress = pageState.coursesInProgress?.map((course) => (course.courseId === courseData._id ? courseData : course));
    const index = coursesInProgress?.findIndex((course: any) => (course._id === courseData._id || course?.courseId === courseData._id || course?.courseId?._id === courseData._id));

    if (index == -1 || index == undefined || !coursesInProgress?.[index]) {
      coursesInProgress?.push({
        ...courseData,
        courseId: courseData,
      });
    } else {
      coursesInProgress[index] = courseData;
    }

    setCoursesInProgress(coursesInProgress ?? []);
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

  const fetchProgress = async (userId?: string | number) => {
    setLoading(true, "loadingProgress");

    let userMongo = null;

    try {
      if (!userId && user?.uid) {
        userMongo = await getUserByFirebaseUserId({ firebaseUserId: user?.uid, createUser: true, userData: user });
      }

      if (userId || userMongo?._id || userId) {

        const data = await fetchTk(`/api/progressCourse/${userId ?? userMongo?._id ?? userMongo?.id ?? ""}`);
        const savedProgress = await data.json();

        if (Array.isArray(savedProgress)) {
          setCoursesInProgress(savedProgress as Array<never>);
        } else setCoursesInProgress([]);
      }
    } catch (error) {
      console.error("unable to fetch progress", error);
    }

    setLoading(false, "loadingProgress");
  };

  const getCourses = async () => {
    setLoading(true, "loadingCourses");

    try {
      const data = await fetchTk(`${getApiURL()}/api/courses`);
      const courses: LoadedDataCourse[] = await data.json();
      setCourses(courses);
    } catch (err) {
      console.error("An error occurred while fetching courses", err);
      setCourses([]);
    }

    setLoading(false, 'loadingCourses');
  };

  useEffect(() => {
    getCourses();
  }, [pageState?.sessionRestored]);

  useEffect(() => {
    if (user?.uid) {
      setPageState((prev) => ({ ...prev, user, userId: "" }));
      refreshProgress();
    }
  }, [user?.uid, pageState?.sessionRestored]);

  useEffect(() => {
    setLoading(loadingAuth, "loadingAuth");
  }, [loadingAuth]);

  function refreshProgress() {
    setLoading(true, "loadingProgress");

    if (!pageState.userId && user?.uid) {
      getUserByFirebaseUserId({ firebaseUserId: user?.uid, createUser: true, userData: user }).then((userMongo) => {
        updateSessionId(userMongo?._id ?? userMongo?.id ?? "");
      }).catch((error) => {
        console.error("unable to fetch user", error);
      });
    } else if (pageState.userId) {
      fetchProgress(pageState.userId);
    } else {
      setLoading(false, "loadingProgress");
      setCoursesInProgress([]);
    }
  }

  function refreshCourses() {
    getCourses();
  }

  const contextValue = useMemo(() => ({ ...pageState, updateSessionId, openCourse, updateCourse, user, refreshProgress, refreshCourses }), [pageState, updateSessionId, openCourse, updateCourse]);

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
};
