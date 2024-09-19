import { Schema, model, models } from 'mongoose';

const ActivityStepCourseSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "courseId is required"]
  },
  stepId: {
    type: Schema.Types.ObjectId,
    ref: "StepCourse",
    required: [true, "stepId is required"]
  },
  type: {
    type: Schema.Types.String,
    required: [true, "type is required"]
  },
  question: {
    type: Schema.Types.String,
    required: [true, "question is required"]
  },
  answer: {
    type: Schema.Types.String,
    required: [true, "answer is required"]
  },
  options: {
    type: Schema.Types.Array,
  },
});

const ActivityStepCourse = models?.ActivityStepCourse || model('ActivityStepCourse', ActivityStepCourseSchema);

export default ActivityStepCourse;