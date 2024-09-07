import { connectToDB } from "@/utils/database";
import StepCourse from "@/models/stepCourse";
import ActivityStepCourse from "@/models/ActivityStepCourse";

export async function GET(req: Request, { params }: { params: { courseId: number | string; }; }) {
  try {
    await connectToDB();

    const steps = await StepCourse.find({});
    if (!steps) return new Response("no steps found for this course", { status: 404 });

    const promiseQuestions = steps.map((step) => new Promise(async (res) => {
      try {
        const questions = await ActivityStepCourse.find({ courseId: params.courseId, stepId: step._id });
        step.questions = questions ?? [];
        res(step);
      } catch (err) {
        console.error("some error occurred on load questions from step", err);
        res(step);
      }
    }));

    const loadedSteps = await Promise.all(promiseQuestions);

    return new Response(JSON.stringify(loadedSteps), { status: 200 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
