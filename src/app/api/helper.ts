import { ActivityStepCourse as ActivityStepCourseType } from '@/types/activityStepCourse';
import ActivityStepCourse from "@/models/ActivityStepCourse";

interface ResponseReq {
  message: string;
  status: number;
  [key: string]: any;
}

export function checkAuth(req: Request): ResponseReq | undefined {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return { message: "Server configuration error: AUTH_TOKEN is not set", status: 500 };
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return { message: "Unauthorized", status: 401 };
  }
}

export async function updateActivityStepCourse({ id, _id, courseId, stepId, type, question, answer, options, explanation }: {
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

  const activity = await ActivityStepCourse.findById((id ?? _id));

  if (!activity) {
    return { message: "activity not found", status: 404 };
  }

  activity.type = type ?? activity.type;
  activity.question = question ?? activity.question;
  activity.answer = answer ?? activity.answer;
  activity.options = options ?? activity.options;
  activity.explanation = explanation ?? activity.explanation;

  await activity.save();

  return { message: "Activity updated", status: 200, activity };
}