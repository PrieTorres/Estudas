import { Course } from "./course";

export interface ProgressCourse {
  _id: string | number;
  courseId: Course | number | string;
  userId: number | string;
  progress: number;
}