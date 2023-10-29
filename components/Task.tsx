import Link from "next/link";

const Task = ({ task, tasks, setTasks, setSortby, updateTasks }: any) => {
  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await fetch(`/api/edit/${task._id}`, {
          method: "DELETE",
          cache: "no-store",
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

  async function handleChecked() {
    try {
      await fetch(`/api/edit/${task._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: task.title,
          desc: task.description,
          date: task.date,
          checked: !task.checked,
        }),
        cache: 'no-store',
      });
      updateTasks()
    } catch (error) {
      console.log(error);
    } finally {
      setSortby("")
    }
  }

  return (
    <div className={`task ${task.checked ? 'checked' : ''}`}>
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
        <input type="checkbox" onChange={handleChecked} value="checked" className="w-4" checked={task.checked} />
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
