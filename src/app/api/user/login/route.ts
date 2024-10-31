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

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if(!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser?.password);

    if (!existingUser || !isPasswordCorrect) {
      return new Response("Invalid email/username or password", { status: 400 });
    }

    return new Response(JSON.stringify(existingUser), { status: 200 });

  } catch (error) {
    console.error("error by trying to log in", error);
    return new Response("Failed to log in: " + error?.message, { status: 500 });
  }
};