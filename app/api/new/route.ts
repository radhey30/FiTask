import { connectToDb } from "@/utils/database";
import Task from "@/models/task";

export const POST = async (req:any, res:any) => {
  const { title, desc, date, author } = await req.json();
  try {
    await connectToDb();
    const newTask = new Task({
      title: title,
      description: desc,
      date: date,
      checked: false, 
      author: author
    });
    await newTask.save();
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response("Failed to add task", { status: 500 });
  }     
};

export const revalidate = 0;
