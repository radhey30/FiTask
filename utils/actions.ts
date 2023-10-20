"use server";

import { revalidatePath } from "next/cache";
import { connectToDb } from "./database";
import Task from "@/models/task";

interface Params {
  title: string;
  description: string;
  date: string;
  path?: string;
  id?: string;
}

export async function fetchAllTasks() {
  try {
    connectToDb();
    const tasks = await Task.find({});
    return tasks;
  } catch (error: any) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
}

export async function fetchTask(id: string | null) {
  try {
    connectToDb();
    const task = await Task.findById(id);
    return task;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function createTask({ title, description, date, path }: Params) {
  try {
    connectToDb();
    const newTask = new Task({
      title: title,
      description: description,
      date: date,
    });
    await newTask.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
}

export async function updateTask({
  title,
  description,
  date,
  id,
  path,
}: Params) {
  try {
    connectToDb();
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      throw new Error("Failed to update task");
    }
    existingTask.title = title;
    existingTask.description = description;
    existingTask.date = date;
    await existingTask.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

export async function deleteTask(id: string, path: string) {
  try {
    connectToDb();
    await Task.findByIdAndDelete(id);
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}
