/**. Hold tasks state.

Handle adding tasks, updating status, deleting tasks, and filtering.

Render TaskForm, TaskFilter, and TaskList */

import type {
  Task,
  TaskStatus,
  TaskPriority,
  TaskFilterProps,
  TaskFormData,
  TaskSort,
} from "../../types";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";
import { useState } from "react";
import TaskList from "../TaskList/TaskList";
import sortTasks from "../../utils/taskUtils";

export function Dashboard() {
  //state management
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<{
    status: "" | TaskStatus;
    priority: "" | TaskPriority;
  }>({
    status: "" as "" | TaskStatus,
    priority: "" as "" | TaskPriority,
  });
  const [sortKey, setSortKey] = useState<TaskSort>("dueDate"); // default sort

  //Handlers

  //add edit hanndler
  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };
  //Update an existing task after editing
  const handleUpdateTask = (updatedData: TaskFormData) => {
    if (!editingTask) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? { ...task, ...updatedData } : task,
      ),
    );
    //add edit hanndler(remove )
    // const handleEdit = (task: Task) => {
    //   setEditingTask(task);
    // };

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

  // Delete a task by id
  const handleDelete = (taskId: string) => {
    //Take the previous tasks and keep all tasks except the one with this id.
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
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

  // Apply sorting
  const sortedTasks = sortTasks(filteredTasks, sortKey);

  //renders
  return (
    <div>
      {/* Implement task addition */}
      {/* <TaskForm onAddTask={handleAddTask} /> */}
      {/* Task Form for add/edit */}
      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        initialData={editingTask || undefined}
        isEditing={!!editingTask}
      />
      {/* Task Filter UI */}
      <TaskFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />
      {/* Optional: Sort control */}
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as TaskSort)}
        className="border p-1 rounded mb-4"
      >
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
      </select>

      {/* Task List */}
      <TaskList
        // tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        tasks={sortedTasks}
      />
    </div>
  );
}

export default Dashboard;
