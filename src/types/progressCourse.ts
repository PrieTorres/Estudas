import { Course } from "./course";

export interface ActivitiesDone {
  activityId: string;
  answer: string;
}

export interface ProgressCourse {
  _id: string | number;
  courseId: Course | number | string;
  userId: number | string;
  progress: number;
  score?: number;
  stepsDone?: Array<string>;
  activitiesDone?: Array<ActivitiesDone>;
}