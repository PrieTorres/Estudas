import { Schema, model, models } from 'mongoose';

const StepCourseSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "courseId is required"]
  },
  content: {
    type: Schema.Types.String,
  }, 
  type: { // não tem utilidade agora mas futuramente pode ter
    type: Schema.Types.String
  },
  order: {
    type: Schema.Types.Number,
    required: [true, 'Order is required.'],
  }
});

const StepCourse = models?.StepCourse || model('StepCourse', StepCourseSchema);

export default StepCourse;