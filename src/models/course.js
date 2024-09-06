import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  html: {
    type: String,
    //required: [true, 'HTML is required.'],
  }
});

const Course = models.Course || model('Course', CourseSchema);

export default Course;