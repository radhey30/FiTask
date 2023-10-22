"use client"

import { TaskList } from "@/components";
import { useState } from "react";

export default function Home() {

  const [sortby, setSortby] = useState("")
  function handleSelectChange(e:any) {
    setSortby(e.target.value)
  }

  return (
    <main className="px-6 child:smooth mt-16">
      <div className="flex items-center justify-between max-[380px]:flex-col gap-5">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#fcfcfcb6] text-center">Your Tasks</h1>
      <select name="sortby" className="sm:px-2 sm:py-1 py-0.5 px-1 outline-none" defaultValue="" value={sortby} onChange={handleSelectChange}>
        <option value="" disabled>--Sort By--</option>
        <option value="none">None</option>
        <option value="checked">Completed</option>
        <option value="date">By Date</option>
      </select>
      </div>
      <TaskList sortby={sortby} setSortby={setSortby} />
    </main>
  );
} 
