"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Form } from "@/components";
import { createTask } from "@/utils/actions";

const page = () => {
  const router = useRouter();
  const path = usePathname();
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
      await createTask({
        title: task.title,
        date: task.date,
        description: task.desc,
        path: path,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="px-6 child:smooth">
      <Form
        type="create"
        handleSubmit={handleSubmit}
        task={task}
        setTask={setTask}
        submitting={submitting}
      />
    </main>
  );
};

export default page;
