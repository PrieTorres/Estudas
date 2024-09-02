import { courses } from "@/app/courses/metadata";

export async function GET(req: Request) {
  return Response.json(courses);
}