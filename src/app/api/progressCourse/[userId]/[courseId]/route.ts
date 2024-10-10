import { connectToDB } from "@/utils/database";
import ProgressCourse from "@/models/progressCourse";

type paramsType = { 
  userId: number | string; 
  courseId: number | string; 
};

export async function GET(req: Request, { params }: { params: paramsType  }) {
  try {
    await connectToDB();

    const progress = await ProgressCourse.findOne({ userId: params.userId, courseId: params.courseId }).populate("courseId");
    if (!progress) return new Response("no progress found for this user", { status: 404 });

    return new Response(JSON.stringify(progress), { status: 200 });

  } catch (error) {
    console.error("unable to get progress course with user",error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: { params: { id: number | string; }; }) => {
  const { progress } = await request.json();

  try {
    await connectToDB();

    const currentProgress = await ProgressCourse.findById(params.id);

    if (!currentProgress) {
      return new Response("Progress not found", { status: 404 });
    }

    currentProgress.progress = progress;

    await currentProgress.save();

    return new Response("Successfully updated progress", { status: 200 });
  } catch (error) {
    console.error("Error updating progress", error);
    return new Response("Error Updating progress", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: { params: { id: number | string; }; }) => {
  try {
    await connectToDB();

    const currentProgress = await ProgressCourse.findById(params.id);

    if (!currentProgress) {
      return new Response("Progress not found", { status: 404 });
    }

    await currentProgress.remove();

    return new Response("Successfully deleted progress", { status: 200 });
  } catch (error) {
    console.error("Error deleting progress", error);
    return new Response("Error Deleting progress", { status: 500 });
  }
};