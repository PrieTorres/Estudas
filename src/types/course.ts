import { StepCourse } from "./stepCourse";

export interface Course {
    _id: string | number;
    title: string;
    hide?: boolean;
}

export interface LoadedDataCourse{
    _id: string | number;
    title: string;
    steps: Array<StepCourse>;
    progress?: number;
    hide?: boolean;
}