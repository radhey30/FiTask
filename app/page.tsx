import { TaskList } from "@/components";

export default function Home() {
  return (
    <main className="px-6 child:smooth">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#fcfcfcb6] text-center pt-6">Your Tasks</h1>
      <TaskList />
    </main>
  );
} 
