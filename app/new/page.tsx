"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components";

const page = () => {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    desc: "",
    date: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/new", {
        method: "POST",
        body: JSON.stringify({
          title: task.title,
          desc: task.desc,
          date: task.date,
        }),
        cache: 'no-store',
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

  return (
    <main className="px-6 child:smooth">
      <Form type="create" handleSubmit={handleSubmit} task={task} setTask={setTask} submitting={submitting} />
    </main>
  );
};

export default page;
