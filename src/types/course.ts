import { StepCourse } from "./stepCourse";

export interface Course {
    _id: string | number;
    title: string;
}

export interface LoadedDataCourse{
    _id: string | number;
    title: string;
    steps: Array<StepCourse>;
    progress?: number;
}