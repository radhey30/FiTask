import { connectToDb } from "@/utils/database";
import Task from "@/models/task";

export const GET = async (request: any, { params }: any) => {
  await connectToDb();
  const task = await Task.findById(params.id);
  if (task) {
    return new Response(JSON.stringify(task), { status: 200 });
  }
  return new Response("Failed to fetch task", { status: 500 });
};

export const PATCH = async (request: any, { params }: any) => {
  const { title, desc, date, checked } = await request.json();
  
  try {
    await connectToDb();
    const existingTask = await Task.findById(params.id);
    if (!existingTask) {
      return new Response("Task not found", { status: 404 });
    }
    existingTask.title = title;
    existingTask.description = desc;
    existingTask.date = date;
    existingTask.checked = checked;
    await existingTask.save();
    return new Response(JSON.stringify(existingTask), { status: 200 });
  } catch (error) {
    return new Response("Failed to update task", { status: 500 });
  }
};

export const DELETE = async (request: any, { params }: any) => {
  try {
    await connectToDb();
    await Task.findByIdAndDelete(params.id);
    return new Response("Task deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete task", { status: 500 });
  }
};

export const revalidate = 0;
