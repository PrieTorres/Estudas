import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    sparse: true,
  },
  username: {
    type: String,
    sparse: true,
  },
  password: {
    type: String,
  },
  firebaseUserId: {
    type: String,
    sparse: true
  },
  name: {
    type: String,
    required: [true, 'Name is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  },
}, {
  autoIndex: true,
});

const User = models?.User || model("User", UserSchema);

export default User;