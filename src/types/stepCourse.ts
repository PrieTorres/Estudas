import { ActivityStepCourse } from "./activityStepCourse";
import { Course } from "./course";

export interface StepCourse {
  _id: string | number;
  content: string;
  courseId: Course | string | number;
  order: number;
  type?: 'blog' | 'video' | 'activity';
  activities?: Array<ActivityStepCourse>;
}

