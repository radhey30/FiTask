"use client";

import Link from "next/link";
import { useEffect } from "react";

const Form = ({ type, handleSubmit, task, setTask, submitting }: any) => {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#fcfcfcb6] text-center">
        {type === "create" ? "Create New Task" : "Edit Task"}
      </h1>
      <div>
        <form className="form-area" onSubmit={handleSubmit}>
          <label className="label items-center">
            <span className="label-span">Title</span>
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Write your title here..."
              required
              value={task.title}
              onChange={(e) =>
                setTask((prev: any) => {
                  return {
                    ...prev,
                    title: e.target.value,
                  };
                })
              }
            />
          </label>
          <label className="label">
            <span className="label-span">Description</span>
            <textarea
              className="input"
              name="description"
              cols={40}
              rows={3}
              placeholder="Write your description here..."
              required
              value={task.desc}
              onChange={(e) =>
                setTask((prev: any) => {
                  return {
                    ...prev,
                    desc: e.target.value,
                  };
                })
              }
            ></textarea>
          </label>
          <label className="label items-center">
            <span className="label-span">Date</span>
            <input
              className="input min-[480px]:w-3/5"
              type="date"
              name="date"
              required
              value={task.date}
              onChange={(e) =>
                setTask((prev: any) => {
                  return {
                    ...prev,
                    date: e.target.value,
                  };
                })
              }
            />
          </label>
          <div className="w-full flex flex-row justify-evenly mt-5">
            {type === "create" ? (
              <button type="submit" className="button">
                {submitting ? "Adding" : "Add"}
              </button>
            ) : (
              <button type="submit" className="button">
                {submitting ? "Editing" : "Edit"}
              </button>
            )}
            <Link href="/" className="button">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
