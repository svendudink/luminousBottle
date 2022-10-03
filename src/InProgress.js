import React from "react";
import Card from "./components/Card";

export default function InProgress({ tasks, addTask }) {
  return (
    <>
      {tasks
        .filter((item) => item.timeline === "inprogress")
        .map((e) => (
          <Card currentTask={e} tasks={tasks} addTask={addTask} />
        ))}
    </>
  );
}
