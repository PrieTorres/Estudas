import StepCourse from "@/models/stepCourse";
import ActivityStepCourse from "@/models/ActivityStepCourse";
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
    const { courseId, content, type, order } = await req.json();

    if (!courseId || content == undefined || !type || order == undefined) {
      return new Response("Missing required params", { status: 400 });
    }

    await connectToDB();

    const saveStep = new StepCourse({ courseId, content, type, order });
    await saveStep.save();
    return new Response(JSON.stringify(saveStep), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new step " + error?.message, { status: 500 });
  }
}