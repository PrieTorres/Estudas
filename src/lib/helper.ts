import StepCourse from "@/models/stepCourse";
import Course from "@/models/course";
import { LoadedDataCourse } from "@/types/course";
import { StepCourse as StepCourseType } from "@/types/stepCourse";
import { ActivityStepCourse as ActivityStepCourseType } from "@/types/activityStepCourse";
import ActivityStepCourse from "@/models/ActivityStepCourse";
import { User } from "firebase/auth";
import { ActivitiesDone } from "@/types/progressCourse";

type keyType = string | number | symbol;
export function transformArrayToObject<T, K extends keyof T>(array: T[], key: K): Record<T[K] & (keyType), T> {
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
  return process.env.NEXT_PUBLIC_ENVIRONMENT == "production";
};

export function getApiURL() {
  return (isProd() ? process.env.NEXT_PUBLIC_PROD_URL : process.env.NEXT_PUBLIC_DEV_URL) ?? "https://estudas-e527b.web.app";
};

export async function getTokenRecaptcha() {
  try {
    if (typeof grecaptcha?.enterprise?.execute != "function") throw new Error("grecaptcha not loaded");
    const token = await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "", { action: 'LOGIN' });
    return token;
  } catch (error) {
    console.error("unable to get recaptcha token", error);
    throw error;
  }
}

export async function fetchTk(url: string, options?: object) {
  const recapcha = await getTokenRecaptcha();

  const headers = {
    ...(options ?? {}),
    'recaptcha-token': recapcha,
  };

  return fetch(url, {
    headers,
    ...options
  });
}

export async function createUserDb({ firebaseUserId, email, image, name }: { firebaseUserId: string, email: string, image: string, name: string; }) {
  try {
    const res = await fetchTk(`${getApiURL()}/api/user/`, {
      body: JSON.stringify({ firebaseUserId, email, image, name }),
      method: "POST"
    });

    return await res.json();
  } catch (error) {
    console.error("unable to create user", error);
    throw error;
  }
}

export async function getUserByFirebaseUserId({ firebaseUserId, createUser, userData }: { firebaseUserId: string, createUser?: boolean, userData?: User | null; }) {
  try {
    const user = userData?.email ? await fetchUserByEmail(userData?.email ?? firebaseUserId) : await fetchUserByFirebaseUserId(firebaseUserId);

    if (!user._id) {
      if (createUser) {
        return await handleUserCreation(firebaseUserId, userData);
      }

      console.error("no user found getUserByFirebaseUserId", user);
    }

    return user;
  } catch (error) {
    return await handleUserFetchError(error, createUser, firebaseUserId, userData);
  }
}

async function fetchUserByFirebaseUserId(firebaseUserId: string) {
  const data = await fetchTk(`${getApiURL()}/api/user/${firebaseUserId}`);
  return await data.json();
}

async function fetchUserByEmail(email: string) {
  const data = await fetchTk(`${getApiURL()}/api/user/${email}`);
  return await data.json();
}

async function handleUserCreation(firebaseUserId: string, userData?: User | null) {
  if (!userData) throw new Error("missing user data to create user");

  return await createUserDb({
    firebaseUserId,
    email: userData?.email ?? "",
    image: userData?.photoURL ?? "",
    name: userData?.displayName ?? ""
  });
}

async function handleUserFetchError(error: any, createUser?: boolean, firebaseUserId?: string, userData?: User | null) {
  console.error("unable to get user by firebase id", error);
  if (createUser) {
    return await handleUserCreation(firebaseUserId!, userData);
  }

  throw error;
}

export async function saveCourseProgress({ userId, courseId, progress }: { userId: number | string, courseId: number | string, progress: number; }) {
  try {
    const courseProgress = {
      userId, courseId, progress
    };

    const res = await fetchTk(`${getApiURL()}/api/progressCourse`, {
      body: JSON.stringify(courseProgress),
      method: "POST"
    });

    return res;

  } catch (error) {
    console.error("unable to save progress", error);
    throw error;
  }
}

export async function updateCourseProgress({ id, progress, stepsDone, activitiesDone, courseId, userId, score }: {
  id?: number | string;
  courseId?: number | string;
  userId?: number | string;
  progress: number;
  stepsDone?: string[];
  activitiesDone?: ActivitiesDone[];
  score?: number;
}) {
  try {
    let res;

    if (id) {
      res = await fetchTk(`${getApiURL()}/api/progressCourse`, {
        body: JSON.stringify({ id, progress, stepsDone, activitiesDone, score }),
        method: "PATCH"
      });
    } else if (courseId && userId) {
      res = await fetchTk(`${getApiURL()}/api/progressCourse/${userId}/${courseId}`, {
        body: JSON.stringify({ progress, stepsDone, activitiesDone, score }),
        method: "PATCH"
      });
    } else {
      throw new Error("missing params to update progress");
    }

    return res;

  } catch (error) {
    console.error("unable to update progress", error);
    // throw error;
  }
}

export async function saveUpdateCourseProgress({ userId, courseId, progress }: { userId: number | string, courseId: number | string, progress: number; }) {
  if (!userId || !courseId || !progress) throw new Error(
    "missing params to save/update progress"
    + JSON.stringify({ userId: userId, courseId: courseId, progress: progress })
  );

  try {
    const data = await fetchTk(`${getApiURL()}/api/progressCourse/${userId}/${courseId}`);
    const savedProgress = await data?.json();
    if (!savedProgress?._id) {
      return await saveCourseProgress({ userId, courseId, progress });
    } else {
      // return await updateCourseProgress({ id: savedProgress?.id, progress });
    }
  } catch (error) {
    if (error) {
      console.error(error);
      return await saveCourseProgress({ userId, courseId, progress });
    }
  }
}

export async function getDataCourse({ courseId, userId }: { courseId: number | string; userId?: number | string; }): Promise<LoadedDataCourse> {
  try {
    const courseResponse = await fetchTk(`${getApiURL()}/api/courses/${courseId}`);
    const course: LoadedDataCourse = await courseResponse.json();

    const [courseStepsResponse, progressResponse] = await Promise.all([
      fetchTk(`${getApiURL()}/api/stepCourse/${courseId}`),
      userId ? fetchTk(`${getApiURL()}/api/progressCourse/${userId}/${courseId}`) : Promise.resolve(null)
    ]);

    const courseSteps = await courseStepsResponse.json();
    course.steps = courseSteps;

    if (progressResponse) {
      const progress = await progressResponse.json();
      course.progress = progress?.progress ?? 0;
      course.stepsDone = progress?.stepsDone;
      course.activitiesDone = progress?.activitiesDone;
    }

    return course;
  } catch (err) {
    console.error("An error occurred while fetching course data", err);
    return {
      title: "",
      _id: "",
      steps: []
    };
  }
}

export async function createCourse(course: LoadedDataCourse) {
  try {
    const { title, steps } = course;
    const saveCourse = new Course({ title });
    await saveCourse.save();

    const savedSteps = await createSteps(steps, saveCourse._id);

    return { ...saveCourse.toObject(), steps: savedSteps };
  } catch (error: Error | any) {
    console.error(`There was some error while creating course \nmessage:${error?.message ?? ""} \ncode:${error?.code}`);
  }
}

export async function createStep(step: StepCourseType, courseId: number | string) {
  const { content, type, order, questions } = step;

  if (!courseId || content == undefined || !type || order == undefined)
    throw new Error("Missing params to create step " + "step received -> " + JSON.stringify(step, undefined, 2));

  try {
    const saveStep = new StepCourse({ courseId, content, type, order });
    await saveStep.save();

    const savedQuestions = await createQuestions(questions, saveStep._id, courseId);

    return { ...saveStep.toObject(), questions: savedQuestions };
  } catch (err: Error | any) {
    console.error(`There was some error while creating step \nmessage:${err?.message ?? ""} \ncode:${err?.code}`);
    throw err;
  }
}

export async function createSteps(steps: StepCourseType[], courseId: string | number) {
  if (!Array.isArray(steps) || !steps?.length) return [];

  const stepsPromises = steps.map((step, i) => new Promise(async (res, rej) => {
    try {
      const newStep = await createStep(step, courseId);
      res(newStep);
    } catch (err) {
      rej(err);
    }
  }));

  return await Promise.all(stepsPromises);
}

export async function createQuestion(quest: ActivityStepCourseType, stepId: number | string, courseId: string | number) {
  try {
    const { type, question, answer, options } = quest;
    const savedQuestion = new ActivityStepCourse({ courseId, stepId, type, question, answer, options });
    await savedQuestion.save();

    return savedQuestion.toObject();
  } catch (err: Error | any) {
    console.error(`there was some error saving question \nmessage:${err?.message ?? ""} \ncode:${err?.code ?? ""}`);
    throw err;
  }
}

export async function createQuestions(questions: ActivityStepCourseType[] | undefined, stepId: number | string, courseId: string | number) {
  if (!Array.isArray(questions) || !questions?.length) return [];

  const questPromises = questions.map(quest => new Promise(async (res, rej) => {
    try {
      const savedQuest = await createQuestion(quest, stepId, courseId);
      res(savedQuest);
    } catch (err) {
      rej(err);
    }
  }));

  return await Promise.all(questPromises);
}