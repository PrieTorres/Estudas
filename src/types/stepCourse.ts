import { Course } from "./course";

export interface StepCourse {
  _id: string | number;
  content: string;
  courseId: Course | string | number;
  order: number;
  type?: string;
  activities?: Array;
}

