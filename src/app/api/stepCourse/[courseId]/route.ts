import { connectToDB } from "@/utils/database";
import StepCourse from "@/models/stepCourse";

export async function GET(req: Request, { params }: { params: { courseId: number | string; }; }) {
  try {
    await connectToDB();

    const steps = await StepCourse.find({ });
    if (!steps) return new Response("no steps found for this course", { status: 404 });

    return new Response(JSON.stringify(steps), { status: 200 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
