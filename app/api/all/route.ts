import { connectToDb } from "@/utils/database";
import Task from "@/models/task";

export const GET = async (req: any, res: any) => {
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, max-age=0, must-revalidate"
  );
  await connectToDb();
  const tasks = await Task.find({});
  return new Response(JSON.stringify(tasks), { status: 200 });
};
