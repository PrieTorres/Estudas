import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    //unique: [true, 'Email already exists!'],
    sparse: true,
  },
  username: {
    type: String,
    unique: [true, 'username already exists!'],
    sparse: true,
  },
  password: {
    type: String,
  },
  firebaseUserId: {
    type: String,
    //unique: [true, 'Firebase User Id already exists!'],
    sparse: true
  },
  name: {
    type: String,
    required: [true, 'Name is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models?.User || model("User", UserSchema);

export default User;