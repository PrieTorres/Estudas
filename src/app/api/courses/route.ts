import { connectToDB } from "@/utils/database";
import Course from "@/models/course";
import { createSteps } from "../stepCourse/route";
import { LoadedDataCourse } from "@/types/course";

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

export async function createCourse(course: LoadedDataCourse) {
  try {
    const { title, steps } = course;
    const saveCourse = new Course({ title });
    await saveCourse.save();

    const savedSteps = await createSteps(steps, saveCourse._id);

    return { ...saveCourse.toObject(), steps: savedSteps };
  } catch (error) {
    console.error(`There was some error while creating course \nmessage:${err?.message ?? ""} \ncode:${err?.code}`)
  }
}

export async function POST(req: Request) {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return new Response("Server configuration error: AUTH_TOKEN is not set", { status: 500 });
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return new Response("Unauthorized", { status: 401 });
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
