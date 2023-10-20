import { Task } from "@/components";
import { fetchAllTasks } from "@/utils/actions";

export default async function Home() {
  const fetchedTasks = await fetchAllTasks();
  return (
    <main className="px-6 child:smooth">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#fcfcfcb6] text-center pt-6">
        Your Tasks
      </h1>
      {fetchedTasks && fetchedTasks.length > 0 ? (
        <div className="task-list child:border-2">
          {fetchedTasks.map((task) => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              date={task.date}
              description={task.description}
            />
          ))}
        </div>
      ) : (
        <h2>No Tasks Yet</h2>
      )}
    </main>
  );
}
