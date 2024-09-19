import { createQuestion } from "@/lib/helper";
import { ActivityStepCourse as ActivityStepCourseType } from "@/types/activityStepCourse";
import { connectToDB } from "@/utils/database";

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
    const { courseId, stepId, type, question, answer, options } = await req.json();

    if (!courseId || !stepId || !type || !question || !answer) {
      return new Response("Missing required params", { status: 400 });
    }

    await connectToDB();

    const saveStep = await createQuestion({ type, question, answer, options } as ActivityStepCourseType, stepId, courseId);
    return new Response(JSON.stringify(saveStep), { status: 201 });

  } catch (error) {
    return new Response("Failed to create a new question", { status: 500 });
  }
}