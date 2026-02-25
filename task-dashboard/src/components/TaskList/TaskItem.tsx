import React from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

function TaskItem({ task, onStatusChange, onDelete, onEdit }: TaskItemProps) {
  //handled dropdown change event
  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value as TaskStatus;
    onStatusChange(task.id, newStatus); // Call parent handler
  }

  //handle delete
  function handleDelete() {
    onDelete(task.id); //Call parent delete handler
  }

  function getStatusStyle(status: TaskStatus) {
    switch (status) {
      case "completed":
        return "compltedb";
      case "in-progress":
        return "";
      default:
        return "";
    }
  }

  function priorityStyle(priority: string) {
    switch (priority) {
      case "high":
        return "";
      case "medium":
        return "";
      default:
        return "";
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

      {/* Styled Status */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-col gap-1">
          <p>
            Status:
            <span className={getStatusStyle(task.status)}>{task.status}</span>
          </p>
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
          <button
            onClick={() => onEdit(task)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskItem;
