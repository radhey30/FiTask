"use client";

import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  async function getTasks() {
    try {
      const res = await fetch(`/api/all`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updateTasks() {
    await getTasks();
    setTasks((prev) => {
      return prev.filter((task: any) => {
        console.log(task.author);
        return task.author == session?.user?.id
      });
    });
  }
  useEffect(() => {
    updateTasks();
  }, [session?.user?.id]);

  useEffect(() => {
    updateTasks()
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
      // getTasks();
      updateTasks();
    }
  }, [sortby]);
  // if (tasks.length === 0) return <div className="loading">Loading...</div>;
  if (!session?.user) {
    return <div className="signin-text">SignIn to create tasks</div>;
  }
  return (
    <div className="task-list">
      {tasks.map((task, idx) => (
        <Task
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          key={idx}
          setSortby={setSortby}
          updateTasks={updateTasks}
        />
      ))}
    </div>
  );
};

export default TaskList;
