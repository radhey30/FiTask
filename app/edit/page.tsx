"use client";

import { Form } from "@/components";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
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
      const res = await fetch(`/api/task/edit/${id}`);
      const data = await res.json();
      setTask({
        title: data.title,
        desc: data.description,
        date: data.date,
      });
    }
    if (id) setData();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSubmitting(true);
    if (!id) return alert("Id not found");

    try {
      const res = await fetch(`/api/task/edit/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: task.title,
          desc: task.desc,
          date: task.date,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  if(!task.title) return (
    <div className="loading">Loading...</div>
  )

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
