/**export interface TaskFormProps {
onAddTask: (
id: string,
  title: string,
   priority: TaskPriority
  ) => void;
}*/
import { useEffect } from "react";
import React, { useState } from "react";
import type { TaskFormProps, TaskFormData } from "../../types";

function TaskForm({
  onAddTask,
  onUpdateTask,
  initialData,
  isEditing,
}: TaskFormProps) {
  // const [title, setTitle] = useState("");
  // const [priority, setPriority] = useState<TaskPriority>("low");
  const [formData, setFormData] = useState<TaskFormData>(
    initialData || {
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
    },
  );
  //Error State
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (isEditing && onUpdateTask) {
    onUpdateTask(formData);
  } else {
    onAddTask(formData);
  }

  /**title and priority are local state for the form inputs.
onAddTask is a function passed from the parent to add a new task. */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Handle Form Submission
    e.preventDefault();
    if (!formData.title.trim()) setError("Title is required");
    return;

    onAddTask(formData);

    // Reset form
    setFormData({ title: "", description: "", priority: "low", dueDate: "" });
  };

  return (
    <form
      className="bg-white p-6 rounded-xl shadow-sm border mb-8"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <textarea
          className="border p-2 rounded md:col-span-2"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
        />
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
          Add Task
        </button>
      </div>
    </form>
  );
}
export default TaskForm;
