import { connectToDb } from "@/utils/database";
import Task from "@/models/task";

export const GET = async (req: any, res: any) => {
  await connectToDb();
  const tasks = await Task.find({});
  return new Response(JSON.stringify(tasks), { status: 200 });
};

export const revalidate = 1;