import { createStep } from "@/lib/helper";
import { StepCourse as StepCourseType } from "@/types/stepCourse";
import { connectToDB } from "@/utils/database";

export async function GET(req: Request) {
  return new Response("Need to pass courseId", { status: 500 });
};

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
    const { courseId, content, type, order, questions } = await req.json();

    if (!courseId || content == undefined || !type || order == undefined) {
      return new Response("Missing required params", { status: 400 });
    }

    await connectToDB();

    const saveStep = await createStep({ content, type, order, questions } as StepCourseType, courseId);
    return new Response(JSON.stringify(saveStep), { status: 201 });

  } catch (error: Error | any) {
    console.error(error);
    return new Response("Failed to create a new step " + error?.message, { status: 500 });
  }
}