import { connectToDB } from "@/utils/database";
import StepCourse from "@/models/stepCourse";
import ActivityStepCourse from "@/models/ActivityStepCourse";

export async function GET(req: Request, { params }: { params: { courseId: number | string; }; }) {
  try {
    await connectToDB();

    const steps = await StepCourse.find({ courseId: params.courseId }).lean();
    if (!steps || steps.length === 0) {
      return new Response("No steps found for this course", { status: 404 });
    }

    const loadedSteps = await Promise.all(steps.map(async (step) => {
      try {
        const questions = await ActivityStepCourse.find({ courseId: params.courseId, stepId: step._id }).lean();

        return { ...step, questions: questions ?? [] };
      } catch (err) {
        console.error(`Error loading questions for step ${step._id}:`, err);
        return { ...step, questions: [] };
      }
    }));

    return new Response(JSON.stringify(loadedSteps), { status: 200 });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};