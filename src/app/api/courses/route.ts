import { connectToDB } from "@/utils/database";
import Course from "@/models/course";
import { LoadedDataCourse } from "@/types/course";
import { createCourse } from "@/lib/helper";
import { checkAuth } from "../helper";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const courses = await Course.find({ "hide": { "$ne": 'true' } }).sort({ title: "asc" });
    if (!courses?.length) {
      return new Response("No courses data", { status: 200 });
    }

    return new Response(JSON.stringify(courses.filter(course => !course.hide)), { status: 200 });
  } catch (err) {
    console.error("unable to get courses", err);
    return new Response("Unable to get courses", { status: 500 });
  }
}

export async function POST(req: Request) {
  const authRes = checkAuth(req);

  if (authRes) {
    return new Response(authRes.message, { status: authRes.status });
  }

  try {
    const { title, steps } = await req.json();

    if (!title) {
      return new Response("Missing param title", { status: 400 });
    }

    await connectToDB();
    const course = await Course.findOne({ title });
    if (course) {
      return new Response("This course already exists " + JSON.stringify(course), { status: 200 });
    }

    const saveCourse = await createCourse({ title, steps } as LoadedDataCourse);
    return new Response(JSON.stringify(saveCourse), { status: 201 });

  } catch (error) {
    return new Response("Failed to create a new course", { status: 500 });
  }
}
