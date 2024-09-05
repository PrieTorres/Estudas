import { Course } from "./course";

export interface ProgressCourse {
  courseId: Course | number | string;
  userId: number | string;
  progress: number;
}