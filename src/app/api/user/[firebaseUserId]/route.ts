import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: { firebaseUserId: number | string; }; }) {
  try {
    await connectToDB();

    const user = await User.findOne({ firebaseUserId: params.firebaseUserId });
    if (!user) return new Response("no user found", { status: 404 });

    cookies().set('userId', user._id, { httpOnly: false });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("error by getting user by user firebase id ", params.firebaseUserId, error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

/*
TODO: update user route
export const PATCH = async (request: Request, { params }: { params: { id: number | string; }; }) => {
  const { user } = await request.json();

  try {
    await connectToDB();

    const currentUser = await User.findById(params.id);

    if (!currentUser) {
      return new Response("user not found", { status: 404 });
    }

    currentUser.user = user;

    await currentUser.save();

    return new Response("Successfully updated user", { status: 200 });
  } catch (error) {
    console.error("error by updating user ", error);
    return new Response("Error Updating user", { status: 500 });
  }
};*/