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
  }
});

const ProgressCourse = models.ProgressCourse || model('ProgressCourse', ProgressCourseSchema);

export default ProgressCourse;