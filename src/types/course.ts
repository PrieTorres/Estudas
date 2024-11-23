import { ActivitiesDone } from "./progressCourse";
import { StepCourse } from "./stepCourse";

export interface Course {
    _id: string | number;
    title: string;
    hide?: boolean;
}

export interface LoadedDataCourse {
    _id: string | number;
    title: string;
    steps: Array<StepCourse>;
    progress?: number;
    score?: number;
    hide?: boolean;
    stepsDone?: Array<string>;
    activitiesDone?: Array<ActivitiesDone>;
    deleted?: boolean;
}