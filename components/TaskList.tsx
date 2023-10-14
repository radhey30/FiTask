"use client";

import { Task } from ".";
import { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await fetch("/api/task/all", { method: "GET" });
        if (res.ok) {
          setTasks(await res.json());
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, []);

  if (tasks.length === 0) return <div className="loading">Loading...</div>;
  return (
    <div className="task-list child:border-2">
      {tasks.map((task, idx) => (
        <Task task={task} tasks={tasks} setTasks={setTasks} key={idx} />
      ))}
    </div>
  );
};

export default TaskList;
