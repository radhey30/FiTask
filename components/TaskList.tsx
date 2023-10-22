"use client";

import { Task } from ".";
import { useEffect, useState } from "react";

const TaskList = ({
  sortby,
  setSortby,
}: {
  sortby: string;
  setSortby: any;
}) => {
  const [tasks, setTasks] = useState([]);
  async function getTasks() {
    try {
      const res = await fetch("/api/all", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (sortby === "checked") {
      setTasks((prev) => prev.filter((task: any) => task.checked));
    } else if (sortby === "date") {
      const sortedTasks = tasks.sort((a: any, b: any) => {
        const [y, m, d] = a.date.split("-");
        const [y1, m1, d1] = b.date.split("-");
        return (
          new Date(y, m - 1, d).getTime() - new Date(y1, m1 - 1, d1).getTime()
        );
      });
      setTasks([...sortedTasks]);
    } else {
      getTasks();
    }
  }, [sortby]);
  if (tasks.length === 0) return <div className="loading">Loading...</div>;
  return (
    <div className="task-list child:border-2">
      {tasks.map((task, idx) => (
        <Task
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          key={idx}
          setSortby={setSortby}
        />
      ))}
    </div>
  );
};

export default TaskList;
