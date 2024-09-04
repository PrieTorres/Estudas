import { connectToDB } from "@/utils/database";
import ProgressCourse from "@/models/progressCourse";

export function GET(req: Request) {
  return new Response("missing some req props", { status: 500 });
};

export async function POST(req: Request) {
  const { userId, courseId, progress } = await req.json();

  try {
    await connectToDB();
    const saveProgress = new ProgressCourse({ userId, courseId, progress: progress ?? 0 });

    await saveProgress.save();
    return new Response(JSON.stringify(saveProgress), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}