import { Course, LoadedDataCourse } from "@/types/course";

export function transformArrayToObject<T, K extends keyof T>(array: T[], key: K): Record<T[K] & (string | number | symbol), T> {
  return array.reduce<Record<T[K] & (string | number | symbol), T>>((acc, item) => {
    const keyValue = item[key];
    if (typeof keyValue === 'string' || typeof keyValue === 'number') {
      acc[keyValue] = item;
    } else {
      throw new Error(`Key value of type ${typeof keyValue} is not a valid object key.`);
    }
    return acc;
  }, {} as Record<T[K] & (string | number | symbol), T>);
};

export function isProd() {
  return process.env.ENVIRONMENT == "production";
};

export function getApiURL() {
  return (isProd() ? process.env.PROD_URL : process.env.DEV_URL) ?? "http://localhost:3000";
}

export async function saveCourseProgress({ userId, courseId, progress }: { userId: number | string, courseId: number | string, progress: number; }) {
  try {
    const courseProgress = {
      userId, courseId, progress
    };

    const res = await fetch(`${getApiURL()}/api/progressCourse/`, {
      body: JSON.stringify(courseProgress),
      method: "POST"
    });

    return res;

  } catch (error) {
    console.error("unable to save progress", error);
    throw error;
  }
}

export async function updateCourseProgress({ id, progress }: { id: number | string, progress: number; }) {
  try {

    const res = await fetch(`${getApiURL()}/api/progressCourse/`, {
      body: JSON.stringify({ id, progress }),
      method: "POST"
    });

    return res;

  } catch (error) {
    console.error("unable to update progress", error);
    throw error;
  }
}

export async function saveUpdateCourseProgress({ userId, courseId, progress }: { userId: number | string, courseId: number | string, progress: number; }) {
  if (!userId || !courseId || !progress) throw new Error(
    "missing params to save/update progress"
    + JSON.stringify({ userId: userId, courseId: courseId, progress: progress })
  );

  try {
    const data = await fetch(`${getApiURL()}/api/progressCourse/${userId}/${courseId}`);
    const savedProgress = await data?.json();
    if (!savedProgress?._id) {
      return await saveCourseProgress({ userId, courseId, progress });
    } else {
      return await updateCourseProgress({ id: savedProgress?.id, progress });
    }
  } catch (error) {
    if (error) {
      console.error(error);
      return await saveCourseProgress({ userId, courseId, progress });
    }
  }
}

export async function getDataCourse({ courseId }: { courseId: number | string; }): Promise<LoadedDataCourse> {
  try {
    const data = await fetch(`/api/courses/${courseId}`);
    const course: LoadedDataCourse = await data.json();

    try {
      const courseSteps = await (await fetch(`/api/stepCourse/${courseId}`)).json();
      course.steps = courseSteps;
    } catch (err) {
      console.error("unable to find course data", err);
    }

    return course;
  } catch (err) {
    console.error("some error ocurred");
    return ({
      title: "",
      _id: "",
      steps:[]
    })
  }
};