import { connectToDB } from "@/utils/database";
import Course from "@/models/course";

export async function GET(req: Request, { params }: { params: { id: number | string } }) {
  try {
    await connectToDB();

    const course = await Course.findById(params.id);
    if (!course?.id) {
      return new Response(`No course found with id ${params.id}`, { status: 404 });
    }

    return new Response(JSON.stringify(course), { status: 200 });
  } catch (err) {
    console.error(`Unable to get course with id ${params.id}`, err);
    return new Response("Unable to get course", { status: 500 })
  }
}