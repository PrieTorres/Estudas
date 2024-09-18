import ActivityStepCourse from "@/models/ActivityStepCourse";
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

    const saveStep = new ActivityStepCourse({ courseId, stepId, type, question, answer, options });
    await saveStep.save();
    return new Response(JSON.stringify(saveStep), { status: 201 });

  } catch (error) {
    return new Response("Failed to create a new question", { status: 500 });
  }
}