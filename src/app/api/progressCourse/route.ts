import { connectToDB } from "@/utils/database";
import ProgressCourse from "@/models/progressCourse";

export function GET(req: Request) {
  return new Response("missing some req props", { status: 500 });
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
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}