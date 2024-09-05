import { connectToDB } from "@/utils/database";
import ProgressCourse from "@/models/progressCourse";

export async function GET(req: Request, { params }: { params: { courseId: number | string; }; }) {
  try {
    await connectToDB();

    const progress = await ProgressCourse.find({ courseId: params.courseId }).populate("courseId");
    if (!progress) return new Response("no progress found for this user", { status: 404 });

    return new Response(JSON.stringify(progress), { status: 200 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
