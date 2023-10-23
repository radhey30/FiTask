import { connectToDb } from "@/utils/database";
import Task from "@/models/task";

export const GET = async ({params}:any) => {
  await connectToDb();
  const tasks = await Task.find({author: params.id});
  return new Response(JSON.stringify(tasks), { status: 200 });
};

export const revalidate = 0;