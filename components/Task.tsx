import Link from "next/link";

const Task = ({ task, tasks, setTasks }: any) => {
  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await fetch(`/api/edit/${task._id}`, {
          method: "DELETE",
        });
        const filteredTasks = tasks.filter(
          (ctask: any) => ctask._id !== task._id
        );
        setTasks(filteredTasks);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="task">
      <div className="flex flex-row items-center justify-between">
        <p className="text-[#000000b7] text-xl font-semibold">{task.title}</p>
        <p className="text-right text-sm font-medium">{task.date}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-800 font-medium pr-2 mt-3">
          {task.description}
        </p>
      </div>
      <div className="flex self-end gap-3 child:cursor-pointer">
        <Link href={`/edit?id=${task._id}`} title="Edit">
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
