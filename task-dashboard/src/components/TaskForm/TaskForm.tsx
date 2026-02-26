/**export interface TaskFormProps {
onAddTask: (
id: string,
  title: string,
   priority: TaskPriority
  ) => void;
}*/

import { useEffect } from "react";
import React, { useState } from "react";
import type { TaskFormProps, TaskFormData, FormErrors } from "../../types";
import { validateTaskForm } from "../../utils/taskUtils";

const initiastate: TaskFormData = {
  title: "",
  description: "",
  priority: "low", //default priority
  dueDate: "",
};
function TaskForm({
  onAddTask,
  onUpdateTask,
  initialData,
  isEditing,
}: TaskFormProps) {
  // const [title, setTitle] = useState("");
  // const [priority, setPriority] = useState<TaskPriority>("low");
  const [formData, setFormData] = useState<TaskFormData>(initiastate);

  //Validation error state
  const [errors, setErrors] = useState<FormErrors>({});

  // Whenever initialData or isEditing changes, populate the form
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData(initialData);
    } else {
      setFormData(initiastate);
    }
  }, [initialData, isEditing]);

  /**title and priority are local state for the form inputs.
onAddTask is a function passed from the parent to add a new task. */

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Handle Form Submission
    e.preventDefault(); // Prevent page refresh

    const validationErrors = validateTaskForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return; // stop submission if invalid
    
    // // Simple validation: title is required
    //     if (!formData.title.trim()) {
    //       setErrors("Title is required");
    //       return;
    //     }

    // Handle either update or add
    if (isEditing && onUpdateTask) {
      // If editing, update the existing task
      onUpdateTask?.(formData);
    } else {
      // Otherwise, add a new task
      onAddTask(formData);
    }
    // Reset form and clear errors
    setFormData(initiastate);
    setErrors({});
  };

  return (
    <form
      className="bg-white p-6 rounded-xl shadow-sm border mb-8"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Task Title Input */}
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        {/* Task Description */}
        <textarea
          className="border p-2 rounded md:col-span-2"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
        {/* Due Date */}
        <input
          className="border p-2 rounded"
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm">{errors.dueDate}</p>
        )}
        {/* Priority Dropdown */}
        <select
          className="border p-2 rounded"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value as any })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          type="submit"
        >
          {isEditing ? "Update Task" : "Add Task"}{" "}
          {/* Show correct text based on mode */}
        </button>

        <div className="mb-4"></div>
      </div>
    </form>
  );
}
export default TaskForm;
