import { connectToDB } from "@/utils/database";
import Course from "@/models/course";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const courses = await Course.find({});
    if (!courses?.length) {
      return new Response("No courses data", { status: 200 });
    }

    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (err) {
    console.error("unable to get courses", err);
    return new Response("Unable to get courses", { status: 500 })
  }
}