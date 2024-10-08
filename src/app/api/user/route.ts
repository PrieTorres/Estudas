import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export async function POST(req: Request) {
  const { firebaseUserId, email, image, name } = await req.json();

  try {
    await connectToDB();
    const generateUser = () => ((name?.replace(/\s/g, "")?.toLowerCase() ?? "") + `${Math.floor(Math.random() * 10000000000000000)}`).substring(0, 20);
    let userName = generateUser();

    const existingUser = await User.findOne({ $or: [{ email }, { firebaseUserId }] });
    if (existingUser) return new Response(JSON.stringify(existingUser), { status: 200 });

    let existingUserWithSameName = await User.findOne({ name: userName });
    while (existingUserWithSameName?._id) {
      userName = generateUser();
      existingUserWithSameName = await User.findOne({ name: userName });
    }

    const user = await new User({ firebaseUserId, email, image, name: userName });
    user.save();

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("error by creating new user", error);
    return new Response("Failed to create a new user", { status: 500 });
  }
}