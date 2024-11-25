import { Course } from "./course";
import { StepCourse } from "./stepCourse";

export type ActivityStepCourseTypes = 'quiz' | 'quiz_html';

export interface ActivityStepCourse {
  _id: number | string;
  courseId: number | string | Course;
  stepId: number | string | StepCourse;
  type: ActivityStepCourseTypes;
  question: string;
  answer: string;
  options: Array<string>;
  explanation?: string;
  deleted?: boolean;
}