import React from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  //handled dropdown change event
  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value as TaskStatus;
    onStatusChange(task.id, newStatus); //// Call parent handler
  }

  //handle delete
  function handleDelete() {
    onDelete(task.id); //Call parent delete handler
  }
  //status based on task status
  // function getStatusStyle(task: Task) {
  //   let backgroundColor: string;

  //   if (task.status === "completed") {
  //     backgroundColor = "bg-green-100  text-green-800 px-2 py-1 rounded-full text-sm font-medium";
  //   } else if (task.status === "in-progress") {
  //     backgroundColor = "bg-yellow-100  text-green-800 px-2 py-1 rounded-full text-sm font-medium";
  //   } else {
  //     backgroundColor = "red";
  //   }
  //   return {
  //     backgroundColor,
  //     padding: "10px",
  //     margin: "10px 0",
  //   };
  // }
  function getStatusStyle(status: TaskStatus) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

  //style based on priority
  // function priorityStyle(task: Task) {
  //   let color: string;

  //   if (task.priority === "high") {
  //     color = "text-red-600 font-bold capitalize";
  //   } else if (task.priority === "medium") {
  //     color = "text-orange-500 capitalize";
  //   } else {
  //     color = "text-green-600 capitalize";
  //   }
  //   return {
  //     color,
  //     fontWeight: task.priority === "high" ? "bold" : "normal",
  //     textTransform: "capitalize",
  //   };
  // }

  function priorityStyle(priority: string) {
    switch (priority) {
      case "high":
        return "text-red-600 font-bold";
      case "medium":
        return "text-orange-500 capitalize";
      default:
        return "text-green-600 capitalize";
    }
  }

  return (
    // displaying and managing a single task
    <div className="border rounded-lg p-4 flex flex-col gap-3 bg-white ">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 ">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-gray-600"> {task.description}</p>
        </div>
      </div>

      {/* <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate}</p> */}

      {/* Styled Status */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-col gap-1">
          {/* <p>
            Status:
            <span className={getStatusStyle(task.status)}>{task.status}</span>
          </p> */}
          {/* Styled Priority */}
          <p>
            Priority:
            <span className={priorityStyle(task.priority)}>
              {task.priority}
            </span>
          </p>
          <p className="text-black -500">Due Date: {task.dueDate}</p>
        </div>

        <div className="flex gap-2 ">
          {/* Status Dropdown */}
          <select
            className="border border-gray-300 rounded-md p-1"
            value={task.status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskItem;
