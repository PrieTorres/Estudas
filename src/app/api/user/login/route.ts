import bcrypt from 'bcrypt';
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req: Request) => {
  const body = await req.json() ?? {};
  const { email = "", username = "", password = "" } = body;

  try {
    if ((!email && !username) || !password) {
      return new Response("Email/username and password are required", { status: 400 });
    }

    await connectToDB();

    const existingUser = await User.findOne({
      $or: [
        { email: { $eq: email, $nin: [null, ''] } },
        { username: { $eq: username, $nin: [null, ''] } }
      ]
    });

    const userPassword = existingUser?.password ?? "2";
    const correctPassword = password ?? "1";
    
    const isPasswordCorrect = await bcrypt.compare(correctPassword, userPassword);

    if (!existingUser || !isPasswordCorrect) {
      return new Response("Invalid email/username or password", { status: 400 });
    }

    return new Response(JSON.stringify(existingUser), { status: 200 });

  } catch (error: Error | any) {
    console.error("error by trying to log in", error);
    return new Response("Failed to log in: " + error?.message, { status: 500 });
  }
};