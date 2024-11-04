import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { firebaseUserId, email, image, name, username = "", password = "" } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  /*console.log({
    firebaseUserId, email, image, name, username, password
  });*/

  try {
    await connectToDB();
    const generateUser = (_name=name) => ((_name?.replace(/\s/g, "")?.toLowerCase() ?? "") + `${Math.floor(Math.random() * 10000000000000000)}`).substring(0, 20);
    let userName = generateUser(username);

    console.log("userName", userName);

    const existingUser = await User.findOne({
      $or: [
        { email: { $eq: email, $ne: null } },
        { firebaseUserId: { $eq: firebaseUserId, $ne: null } },
        { username: { $eq: username, $ne: null } }
      ]
    });

    if (existingUser) return new Response(JSON.stringify(existingUser), { status: 200 });

    let existingUserWithSameName = await User.findOne({ name: userName });
    while (existingUserWithSameName?._id) {
      if (username) return new Response("Username already exists", { status: 500 });

      userName = generateUser();
      existingUserWithSameName = await User.findOne({ name: userName });
    }

    const user = await new User({ firebaseUserId, email, image, name: userName, username: username, password: hashedPassword }).save();
    user.save();

    cookies().set('userId', user._id, { httpOnly: false });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("error by creating new user", error);
    return new Response("Failed to create a new user", { status: 500 });
  }
}