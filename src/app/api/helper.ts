import ActivityStepCourse from "@/models/ActivityStepCourse";
import { ActivityStepCourse as ActivityStepCourseType } from "@/types/activityStepCourse";
import { Request as RequestExp } from "express";
import { Document } from "mongoose";
import { StepCourse as StepCourseType } from "@/types/stepCourse";
import StepCourse from "@/models/stepCourse";

interface ResponseReq {
  message: string;
  status: number;
  [key: string]: string | number | boolean | object;
}

export function checkAuth(req: RequestExp | Request): ResponseReq | undefined {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return { message: "Server configuration error: AUTH_TOKEN is not set", status: 500 };
  }

  const authHeader = (req.headers as any)?.get?.("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return { message: "Unauthorized", status: 401 };
  }
}

export async function updateActivityStepCourse({ id, _id, courseId, type, question, answer, options, explanation, deleted }: {
  id?: string;
  _id?: string;
  courseId?: string;
  stepId?: string;
  type?: string;
  question?: string;
  answer?: string;
  options?: string[];
  explanation?: string;
  deleted?: boolean;
}): Promise<ResponseReq> {
  if (!id && !_id) {
    return { message: "Missing required params activity id", status: 400 };
  }


  let activity: (Document<unknown, {}, ActivityStepCourseType> & ActivityStepCourseType) | null = null;
  try {
    activity = await ActivityStepCourse.findById(id ?? _id);
  } catch (error: any) {
    return { message: "Error finding activity", status: 500, error };
  }

  if (!activity) {
    return { message: "Activity not found", status: 404 };
  }

  if (typeof activity === "object") {
    activity.type = (type ?? activity.type) as ActivityStepCourseType['type'];
    activity.question = question ?? activity.question;
    activity.answer = answer ?? activity.answer;
    activity.options = options ?? activity.options;
    activity.explanation = explanation ?? activity.explanation;
    activity.courseId = courseId ?? activity.courseId;
    activity.deleted = deleted ?? activity.deleted ?? false;

    await activity.save();
  } else {
    return { message: "Error updating activity, unexpected activity type: " + typeof activity, status: 500 };
  }

  return { message: "Activity updated", status: 200, activity };
}

export async function updateStepCourse({ id, _id, courseId, content, type, order, questions }: {
  id?: string;
  _id?: string;
  courseId?: string;
  content?: string;
  type?: string;
  order?: number;
  questions?: ActivityStepCourseType[];
}): Promise<ResponseReq> {
  if (!id && !_id) {
    return { message: "Missing required params id", status: 400 };
  }

  let step: (Document<unknown, {}, StepCourseType> & StepCourseType) | null = null;
  try {
    step = await StepCourse.findById(id ?? _id);
  } catch (error: any) {
    return { message: "Error finding step", status: 500, error };
  }

  if (!step) {
    return { message: "Step not found", status: 404 };
  }

  if (typeof step === "object") {
    const typeStr = ["video", "blog", "activity"].includes((type ?? step.type) ?? "") ? (type ?? step.type) : "blog";
    step.content = content ?? step.content;
    step.type = typeStr as StepCourseType['type'];
    step.order = order ?? step.order;
    step.courseId = courseId ?? step.courseId;

    await step.save();

    if (Array.isArray(questions)) {
      await Promise.all(questions.map(async (question) => {
        if (!question._id) {
          return await ActivityStepCourse.create({ ...question, courseId, stepId: step._id });
        }

        return await updateActivityStepCourse({
          ...question,
          courseId,
          stepId: step._id as string,
          id: question._id as string,
          _id: question._id as string
        });
      }));
    }

    return { message: "Step updated", status: 200, step };
  } else {
    return { message: "Error updating step, unexpected step type: " + typeof step, status: 500 };
  }
}

export async function createStep({ courseId, content, type, order, questions }: StepCourseType): Promise<ResponseReq> {
  if (!courseId || content == undefined || !type || order == undefined) {
    return { message: "Missing required params", status: 400 };
  }

  let step: (Document<unknown, {}, StepCourseType> & StepCourseType) | null = null;
  try {
    step = await StepCourse.create({ courseId, content, type, order });
  } catch (error: any) {
    return { message: "Error creating step", status: 500, error };
  }

  if (Array.isArray(questions)) {
    await Promise.all(questions.map(async (question) => {
      return await ActivityStepCourse.create({ ...question, courseId, stepId: step?._id });
    }));
  }

  return { message: "Step created", status: 201, step: step ?? {} };
}

export async function deleteStep({ id }: { id: string; }): Promise<ResponseReq> {
  if (!id) {
    return { message: "Missing required params", status: 400 };
  }

  let step: (Document<unknown, {}, StepCourseType> & StepCourseType) | null = null;
  try {
    step = await StepCourse.findById(id);
  } catch (error: any) {
    return { message: "Error finding step", status: 500, error };
  }

  if (!step) {
    return { message: "Step not found", status: 404 };
  }

  try {
    step.deleted = true;
    step.markModified('deleted');
    const res = await step.save();
    return { message: "Step deleted", status: 200, res };
  } catch (error: any) {
    return { message: "Error deleting step " + error?.message, status: 500, error };
  }
}

export async function deleteActivity({ id }: { id: string; }): Promise<ResponseReq> {
  if (!id) {
    return { message: "Missing required params", status: 400 };
  }

  let activity: (Document<unknown, {}, ActivityStepCourseType> & ActivityStepCourseType) | null = null;
  try {
    activity = await ActivityStepCourse.findById(id);
  } catch (error: any) {
    return { message: "Error finding activity", status: 500, error };
  }

  if (!activity) {
    return { message: "Activity not found", status: 404 };
  }

  try {
    activity.deleted = true;
    activity.markModified('deleted');
    const res = await activity.save();
    return { message: "Activity deleted", status: 200, res };
  } catch (error: any) {
    return { message: "Error deleting activity", status: 500, error };
  }
}