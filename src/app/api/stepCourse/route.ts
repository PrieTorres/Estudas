import StepCourse from "@/models/stepCourse";
import { connectToDB } from "@/utils/database";
import { StepCourse as StepCourseType } from "@/types/stepCourse";
import { ActivityStepCourse as ActivityStepCourseType } from "@/types/activityStepCourse";
import { createQuestions } from "../activityStepCourse/route";

export async function GET(req: Request) {
  return new Response("Need to pass courseId", { status: 500 });
};

interface StepCourseCreateType extends StepCourseType {
  questions: Array<ActivityStepCourseType>
}

export async function createStep(step: StepCourseCreateType, courseId: number | string) {
  const { content, type, order, questions } = step;

  if (!courseId || content == undefined || !type || order == undefined)
    throw new Error("Missing params to create step " + "step received -> " + JSON.stringify(step, 2));

  try {
    const saveStep = new StepCourse({ courseId, content, type, order });
    await saveStep.save();

    //console.log(step, questions)
    const savedQuestions = await createQuestions(questions, saveStep._id, courseId);

    return { ...saveStep.toObject(), questions: savedQuestions };
  } catch (err) {
    console.error(`There was some error while creating step \nmessage:${err?.message ?? ""} \ncode:${err?.code}`);
    throw err;
  }
}

export async function createSteps(steps: StepCourseCreateType[], courseId: string | number) {
  if (!Array.isArray(steps) || !steps?.length) return [];

  const stepsPromises = steps.map((step, i) => new Promise(async (res, rej) => {
    try {
      const newStep = await createStep(step, courseId);
      res(newStep);
    } catch (err) {
      rej(err);
    }
  }));

  return await Promise.all(stepsPromises);
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
    const { courseId, content, type, order } = await req.json();

    if (!courseId || content == undefined || !type || order == undefined) {
      return new Response("Missing required params", { status: 400 });
    }

    await connectToDB();

    const saveStep = new StepCourse({ courseId, content, type, order });
    await saveStep.save();
    return new Response(JSON.stringify(saveStep), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new step " + error?.message, { status: 500 });
  }
}