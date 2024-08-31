import { courses } from "@/app/courses/metadata";

export async function GET(req: Request, { params }) {
  const course = courses.find(c => c.id === params?.id);
  return Response.json(course??{}, {
    status: course? 200 : 404
  });
}