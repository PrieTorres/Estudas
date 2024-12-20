import ActivityStepCourse from "@/models/ActivityStepCourse";
import { connectToDB } from "@/utils/database";

export async function GET(req: Request, { params }: { params: { courseId: number | string; stepId: number | string; }; }) {
  try {
    const TOKEN = process.env.AUTH_TOKEN;
    const { courseId, stepId } = params;

    if (!TOKEN) {
      return new Response("Server configuration error: AUTH_TOKEN is not set", { status: 500 });
    }

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (token !== TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const activity = await ActivityStepCourse.find({ courseId, stepId });
    return new Response(JSON.stringify(activity), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Failed to get the activity", { status: 500 });
  }
}