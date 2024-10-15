import { connectToDB } from "@/utils/database";
import ProgressCourse from "@/models/progressCourse";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const userId = cookies().get("userId");
  if (!userId) return new Response("need to be logged in to get course progress data", { status: 500 });

  try {
    await connectToDB();

    const progress = await ProgressCourse.find({ userId }).populate("courseId");
    if (!progress) return new Response("no progress found for this user", { status: 404 });

    return new Response(JSON.stringify(progress), { status: 200 });

  } catch (error) {
    console.error("error by loading progress data course by user id ", userId, error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export async function POST(req: Request) {
  const { userId, courseId, progressPercent } = await req.json();

  try {
    await connectToDB();
    const progress = await ProgressCourse.findOne({ userId, courseId });
    if (progress) return new Response("Already saved " + JSON.stringify(progress), { status: 201 });

    const saveProgress = new ProgressCourse({ userId, courseId, progress: progressPercent ?? 0 });

    await saveProgress.save();
    return new Response(JSON.stringify(saveProgress), { status: 201 });
  } catch (error) {
    console.error("error saving progress", error, { userId, courseId, progressPercent });
    return new Response("Failed to save progress", { status: 500 });
  }
}

export const PATCH = async (request: Request) => {
  try {
    const { id, progress, stepsDone, activitiesDone } = await request.json();

    await connectToDB();
    const currentProgress = await ProgressCourse.findById(id);

    if (!currentProgress) {
      return new Response("Progress not found", { status: 404 });
    }

    if (progress !== undefined) currentProgress.progress = progress;
    if (stepsDone !== undefined) currentProgress.stepsDone = stepsDone;
    if (activitiesDone !== undefined) currentProgress.activitiesDone = activitiesDone;

    await currentProgress.save();

    return new Response("Successfully updated progress", { status: 200 });
  } catch (error) {
    console.error("Error updating progress", error);
    return new Response("Error updating progress", { status: 500 });
  }
};