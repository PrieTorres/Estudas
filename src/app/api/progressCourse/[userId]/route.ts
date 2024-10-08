import { connectToDB } from "@/utils/database";
import ProgressCourse from "@/models/progressCourse";

export async function GET(req: Request, { params }: { params: { userId: number | string; }; }) {
  try {
    await connectToDB();

    const progress = await ProgressCourse.find({ userId: params.userId }).populate("courseId");
    if (!progress) return new Response("no progress found for this user", { status: 404 });

    return new Response(JSON.stringify(progress), { status: 200 });

  } catch (error) {
    console.error("error by loading progress data course by user id ", params.userId, error);
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
    return new Response("Error Updating progress", { status: 500 });
  }
};