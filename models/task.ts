import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  checked: {
    type: Boolean,
  },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
