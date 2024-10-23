import { fetchTk, getApiURL, getTokenRecaptcha, getUserByFirebaseUserId, updateCourseProgress } from "@/lib/helper";
import { LoadedDataCourse } from "@/types/course";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from "firebase/auth";
import { auth } from "@/firebase";

interface UserAuth extends User {
  _id: string;
}

interface PageContextProps {
  user?: UserAuth | null;
  userId?: any;
  loading?: boolean;
  coursesInProgress?: any[];
  courseList?: any[];
  loadedCourse?: LoadedDataCourse;
  openCourse?: (courseData: LoadedDataCourse) => void;
  updateCourse?: (courseData: LoadedDataCourse, fetch?: boolean) => void;
  fetchProgress?: () => void;
  updateSessionId?: (userId: string) => void;
  refreshProgress?: () => void;
  refreshCourses?: () => void;
}

export const PageContext = createContext<PageContextProps>({});

export const PageProvider = ({ children }: { children: ReactNode; }) => {
  const [user, loadingAuth] = useAuthState(auth) as [UserAuth | null, boolean, Error | undefined];
  const [pageState, setPageState] = useState<PageContextProps>({
    user,
    loading: loadingAuth,
    coursesInProgress: [],
    courseList: [],
  });

  const setCourses = (courseList: any[]) => setPageState((prev) => ({ ...prev, courseList }));
  const setLoading = (loading: boolean) => setPageState((prev) => ({ ...prev, loading }));
  const setCoursesInProgress = (coursesInProgress: any[]) => setPageState((prev) => ({ ...prev, coursesInProgress }));

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
    setLoading(true);

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

    setLoading(false);
  };

  const getCourses = async () => {
    setLoading(true);

    try {
      const data = await fetchTk(`${getApiURL()}/api/courses`);
      const courses: LoadedDataCourse[] = await data.json();
      setCourses(courses);
    } catch (err) {
      console.error("An error occurred while fetching courses", err);
      setCourses([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      setPageState((prev) => ({ ...prev, user, userId: "" }));
      refreshProgress();
    }
  }, [user?.uid]);


  /*useEffect(() => {
    if (!loadingAuth) refreshProgress();
  }, [pageState.user?.uid, pageState.userId, loadingAuth]);*/


  function refreshProgress() {
    if (!pageState.userId && user?.uid) {
      getUserByFirebaseUserId({ firebaseUserId: user?.uid, createUser: true, userData: user }).then((userMongo) => {
        updateSessionId(userMongo?._id ?? userMongo?.id ?? "");
      }).catch((error) => {
        console.error("unable to fetch user", error);
      });
    } else if (pageState.userId) {
      fetchProgress(pageState.userId);
    } else {
      setLoading(false);
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
