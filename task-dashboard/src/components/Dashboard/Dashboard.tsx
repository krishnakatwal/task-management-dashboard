/**. Hold tasks state.

Handle adding tasks, updating status, deleting tasks, and filtering.

Render TaskForm, TaskFilter, and TaskList */

import type {
  Task,
  TaskStatus,
  TaskPriority,
  TaskFilterProps,
  TaskFormData,
} from "../../types";
import TaskFilter from "../TaskFilter/TaskFilter";

import TaskForm from "../TaskForm/TaskForm";
import { useState } from "react";
import TaskList from "../TaskList/TaskList";

export function Dashboard() {
  //state management
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [filters, setFilters] = useState<TaskFilter>({})
  const [filters, setFilters] = useState<{
  status: "" | TaskStatus;
  priority: "" | TaskPriority;
}>({
  status: "" as "" | TaskStatus,
  priority: "" as "" | TaskPriority,
});
  // Add a new task
  // const handleAddTask = (
  //   id: string,
  //   title: string,
  //   description: string,
  //   priority: TaskPriority,
  //   dueDate: string,
  // ) => {
  //   const newTask: Task = {
  //     id,
  //     title,
  //     description,
  //     status: "pending",
  //     priority,
  //     dueDate,
  //   };
  //   setTasks((prev) => [...prev, newTask]);
  // };
//add edit hanndler
    const handleEdit = (task: Task) => {
      setEditingTask(task);
    };
  //handle Update Task
  const handleUpdateTask = (updatedData: TaskFormData) => {
    if (!editingTask) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? { ...task, ...updatedData } : task
      ),
    );
    //add edit hanndler
    const handleEdit = (task: Task) => {
      setEditingTask(task);
    };

    setEditingTask(null); // Exit edit mode
  };

  //Add  a new task
  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      status: "pending",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Update task status
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // Delete a task
  const handleDelete = (taskId: string) => {
    //Take the previous tasks and keep all tasks except the one with this id.
    setTasks((prev) => prev.filter((task) => task.id! == taskId));
  };

  // Handle filter changes

  const handleFilterChange: TaskFilterProps["onFilterChange"] = (
    newFilters,
  ) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  // Apply filters to tasks
  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div>
      {/* Implement task addition */}
      {/* <TaskForm onAddTask={handleAddTask} /> */}
      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        initialData={editingTask || undefined}
        isEditing={!!editingTask}
      />
      <TaskFilter filters={filters} onFilterChange={handleFilterChange} />
      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Dashboard;
