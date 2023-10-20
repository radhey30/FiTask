"use client";

import { Form } from "@/components";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { fetchTask, updateTask } from "@/utils/actions";

const page = () => {
  const router = useRouter();
  const path = usePathname()
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    date: "",
  });

  useEffect(() => {
    async function setData() {
      const task = await fetchTask(id);
      setTask({
        title: task.title,
        desc: task.description,
        date: task.date,
      });
    }
    if (id) setData();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSubmitting(true);
    if (!id) return alert("Id not found");

    try {
      await updateTask({
        title: task.title,
        description: task.desc,
        date: task.date,
        id: id,
        path: path,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  if (!task.title) return <div className="loading">Loading...</div>;

  return (
    <main className="px-6 child:smooth">
      <Form
        type="edit"
        handleSubmit={handleSubmit}
        task={task}
        setTask={setTask}
        submitting={submitting}
      />
    </main>
  );
};

export default page;
