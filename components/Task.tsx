"use client"

import { deleteTask } from "@/utils/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Params {
  title: string;
  date: string;
  description: string;
  id: string;
}

const Task = ({ title, date, description, id }: Params) => {
  // async function handleDelete() {
  //   const confirmed = confirm("Are you sure you want to delete this task?");
  //   if (confirmed) {
  //     try {
  //       await fetch(`/api/edit/${task._id}`, {
  //         method: "DELETE",
  //         cache: 'no-store',
  //       });
  //       const filteredTasks = tasks.filter(
  //         (ctask: any) => ctask._id !== task._id
  //       );
  //       setTasks(filteredTasks);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
  const path = usePathname()
  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this task?")
    if(confirmed) {
      try {
        await deleteTask(id, path)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="task">
      <div className="flex flex-row items-center justify-between">
        <p className="text-[#000000b7] text-xl font-semibold">{title}</p>
        <p className="text-right text-sm font-medium">{date}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-800 font-medium pr-2 mt-3">
          {description}
        </p>
      </div>
      <div className="flex self-end gap-3 child:cursor-pointer">
        <Link href={`/edit?id=${id}`} title="Edit">
          ✏️
        </Link>
        <span title="Delete" onClick={handleDelete}>
          🗑️
        </span>
      </div>
    </div>
  );
};

export default Task;
