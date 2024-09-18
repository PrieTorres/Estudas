import ActivityStepCourse from "@/models/ActivityStepCourse";
import { ActivityStepCourse as ActivityStepCourseType } from "@/types/activityStepCourse";
import { connectToDB } from "@/utils/database";

export async function createQuestion(quest: ActivityStepCourseType, stepId: number | string, courseId: string | number) {
  try {
    const { type, question, answer, options } = quest;
    const savedQuestion = new ActivityStepCourse({ courseId, stepId, type, question, answer, options });
    await savedQuestion.save();

    return savedQuestion.toObject();
  } catch (err) {
    console.error(`there was some error saving question \nmessage:${err?.message ?? ""} \ncode:${err?.code ?? ""}`);
    throw err;
  }
}

export async function createQuestions(questions: ActivityStepCourseType[], stepId: number | string, courseId: string | number){
  if(!Array.isArray(questions) || !questions?.length) return [];

  const questPromises = questions.map(quest => new Promise(async (res, rej) => {
    try{
      const savedQuest = await createQuestion(quest, stepId, courseId);
      res(savedQuest);
    } catch (err){
      rej(err);
    }
  }))

  return await Promise.all(questPromises);
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
    const { courseId, stepId, type, question, answer, options } = await req.json();

    if (!courseId || !stepId || !type || !question || !answer) {
      return new Response("Missing required params", { status: 400 });
    }

    await connectToDB();

    const saveStep = await createQuestion({ courseId, stepId, type, question, answer, options } as ActivityStepCourseType);
    return new Response(JSON.stringify(saveStep), { status: 201 });

  } catch (error) {
    return new Response("Failed to create a new question", { status: 500 });
  }
}