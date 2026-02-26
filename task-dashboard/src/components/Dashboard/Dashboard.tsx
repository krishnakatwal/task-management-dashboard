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
import { useState, useEffect } from "react";
import TaskList from "../TaskList/TaskList";
import { sortTasks, importTasks, exportTasks } from "../../utils/taskUtils";

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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const imported = await importTasks(e.target.files[0]);
        setTasks((prev) => [...prev, ...imported]);
      } catch (err) {
        alert("Failed to import tasks. Check file format.");
      }
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
  // const filteredTasks = tasks.filter((task) => {
  //   if (filters.status && task.status !== filters.status) return false;
  //   if (filters.priority && task.priority !== filters.priority) return false;
  //   return true;
  // });

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Apply sorting
  const sortedTasks = sortTasks(filteredTasks, sortKey);

  //renders
  return (
    <div>
     
      {/* {/* Task Form for add/edit */}
      <div>
        <button
          onClick={() => exportTasks(tasks)}
          className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Export Data
        </button>
        <label className="text-sm px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md cursor-pointer hover:bg-indigo-100 transition-colors">
          Import JSON
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
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

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

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
