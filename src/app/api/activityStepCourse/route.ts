import { createQuestion } from "@/lib/helper";
import ActivityStepCourse from "@/models/ActivityStepCourse";
import { ActivityStepCourse as ActivityStepCourseType } from "@/types/activityStepCourse";
import { connectToDB } from "@/utils/database";
import { updateActivityStepCourse } from "../helper";

interface StepCourseItem {
  id?: string,
  _id?: string,
  courseId?: string,
  stepId?: string,
  type?: string,
  question?: string,
  answer?: string,
  options?: string[],
  explanation?: string;
}

interface PostParams {
  courseId?: string, stepId?: string, type?: string,
  question?: string, answer?: string,
  options?: string[], explanation?: string, array?: StepCourseItem[];
}

export async function POST(req: Request) {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return new Response("Server configuration error: AUTH_TOKEN is not set", { status: 500 });
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { courseId, stepId, type, question, answer, options, explanation, array }: PostParams = await req.json();

    if (!courseId || !stepId || !type || !question || !answer) {
      return new Response("Missing required params", { status: 400 });
    }

    await connectToDB();

    if (array) {
      const promises = array.map(async (item: StepCourseItem) => {
        const { type, question, answer, options, explanation } = item;
        return await createQuestion({ type, question, answer, options, explanation } as ActivityStepCourseType, stepId, courseId);
      });

      const saveSteps = await Promise.all(promises);
      return new Response(JSON.stringify(saveSteps), { status: 201 });
    }

    const saveStep = await createQuestion({ type, question, answer, options, explanation } as ActivityStepCourseType, stepId, courseId);
    return new Response(JSON.stringify(saveStep), { status: 201 });

  } catch (error) {
    return new Response("Failed to create a new question", { status: 500 });
  }
}

export async function GET(req: Request) {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return new Response("Server configuration error: AUTH_TOKEN is not set", { status: 500 });
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await connectToDB();

    const activity = await ActivityStepCourse.find({});
    return new Response(JSON.stringify(activity), { status: 200 });

  } catch (error) {
    return new Response("Failed to get the activity", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const TOKEN = process.env.AUTH_TOKEN;

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await connectToDB();
    const { id, _id, courseId, stepId, type, question, answer, options, explanation, array } = await req.json();

    if (!array) {
      const update = await updateActivityStepCourse({ id, _id, courseId, stepId, type, question, answer, options, explanation });

      if (!update.activity) {
        return new Response(update.message, { status: update.status });
      }

      return new Response(JSON.stringify(update.activity), { status: update.status });
    } else {
      const promises = array.map(async (item: StepCourseItem) => {
        const { id, _id, courseId, stepId, type, question, answer, options, explanation } = item;
        return await updateActivityStepCourse({ id, _id, courseId, stepId, type, question, answer, options, explanation });
      });

      const updates = await Promise.all(promises);
      return new Response(JSON.stringify(updates), { status: 200 });
    }

  } catch (error) {
    return new Response("Failed to update the activity", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return new Response("Server configuration error: AUTH_TOKEN is not set", { status: 500 });
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { id, _id } = await req.json();

    if (!id && !_id) {
      return new Response("Missing required params activity id", { status: 400 });
    }

    await connectToDB();

    const activity = await ActivityStepCourse.deleteOne({ _id: id || _id });
    return new Response(JSON.stringify(activity), { status: 200 });

  } catch (error) {
    return new Response("Failed to delete the activity", { status: 500 });
  }
}