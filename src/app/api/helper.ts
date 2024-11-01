import ActivityStepCourse from "@/models/ActivityStepCourse";
import { ActivityStepCourse as ActivityStepCourseType } from "@/types/activityStepCourse";
import { Request } from "express";
import { Document } from "mongoose";

interface ResponseReq {
  message: string;
  status: number;
  [key: string]: string | number | boolean | object;
}

export function checkAuth(req: Request): ResponseReq | undefined {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return { message: "Server configuration error: AUTH_TOKEN is not set", status: 500 };
  }

  const authHeader = req.headers['authorization'] as string | undefined;
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return { message: "Unauthorized", status: 401 };
  }
}

export async function updateActivityStepCourse({ id, _id, type, question, answer, options, explanation }: {
  id?: string;
  _id?: string;
  courseId?: string;
  stepId?: string;
  type?: string;
  question?: string;
  answer?: string;
  options?: string[];
  explanation?: string;
}): Promise<ResponseReq> {
  if (!id && !_id) {
    return { message: "Missing required params", status: 400 };
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

    await activity.save();
  } else {
    return { message: "Error updating activity, unexpected activity type: " + typeof activity, status: 500 };
  }

  return { message: "Activity updated", status: 200, activity };
}