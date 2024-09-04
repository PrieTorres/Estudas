import { Schema, model, models } from 'mongoose';

const ProgressCourseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  progress: {
    type: Schema.Types.Number,
    required: [true, 'Progress is required.'],
  }
});

const ProgressCourse = models.ProgressCourse || model('ProgressCourse', ProgressCourseSchema);

export default ProgressCourse;