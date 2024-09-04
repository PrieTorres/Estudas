import { connectToDB } from "@/utils/database";
import ProgressCourse from "@/models/progressCourse";

type paramsType = { 
  userId: number | string; 
  courseId: number | string; 
};

export async function GET(req: Request, { params }: { params: paramsType  }) {
  try {
    await connectToDB();

    const progress = await ProgressCourse.findOne({ userId: params.userId, courseId: params.courseId }).populate("userId").populate("courseId");
    if (!progress) return new Response("no progress found for this user", { status: 404 });

    return new Response(JSON.stringify(progress), { status: 200 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};