import { Schema, model, models } from 'mongoose';

const ProgressCourseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required.'],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, 'courseId is required.'],
  },
  progress: {
    type: Schema.Types.Number,
    required: [true, 'Progress is required.'],
    min: 0,
  },
  score: {
    type: Schema.Types.Number,
    min: 0,
    max: 100,
  },
  stepsDone: { type: [String], default: [] },
  activitiesDone: [{
    activityId: { type: String, required: true },
    answer: { type: String, required: true }
  }]
});

const ProgressCourse = models?.ProgressCourse || model('ProgressCourse', ProgressCourseSchema);

export default ProgressCourse;