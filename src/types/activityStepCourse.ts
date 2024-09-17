import { Course } from "./course";
import { StepCourse } from "./stepCourse";

export interface ActivityStepCourse {
  _id: number | string;
  courseId: number | string | Course;
  stepId: number | string | StepCourse;
  type: 'quiz';
  question: string;
  response: string;
  options: Array<string>;
}