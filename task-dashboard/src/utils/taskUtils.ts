import type { Task, TaskSort, TaskFormData, FormErrors } from "../types";

export const sortTasks = (tasks: Task[], sortBy: TaskSort): Task[] => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case "dueDate":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "priority":
        const priorityMap = { high: 1, medium: 2, low: 3 };
        return priorityMap[a.priority] - priorityMap[b.priority];

      case "status":
        // localeCompare is the best way to sort strings
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  });
};
/**save your app's data to a file and load it back later, much like "Save As" and "Open" in a desktop app.*/
export const exportTasks = (tasks: Task[]) => {
  /**Convert JS objects to a string */
  const dataStr = JSON.stringify(tasks, null, 2);
  /**Create a "Blob" (virtual file) containing the JSON string */
  const blob = new Blob([dataStr], { type: "application/json" });
  /**Generate a temporary URL pointing to that virtual file
 */
  const url = URL.createObjectURL(blob);
/** Create a hidden <a> element to trigger the download */
  const link = document.createElement("a");
  link.href = url;
  /** File name includes current date (e.g., tasks_export_2023-10-27.json) */
  link.download = `tasks_export_${new Date().toISOString().split("T")[0]}.json`;

  /**Simulate a click to start download, then remove the temporary URL from memory*/
  link.click();
  URL.revokeObjectURL(url); // Clean up
};
/**returns A Promise that resolves with the tasks or rejects if the file is invalid. */
export const importTasks = (file: File): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        /**Convert the file text back into JavaScript objects */
        const tasks = JSON.parse(e.target?.result as string);
        resolve(tasks);
      } catch (err) {
        reject(new Error("Invalid JSON file format"));
      }
    };
    /** Start reading the file as plain text */
    reader.readAsText(file);
  });
};

export const validateTaskForm = (formData: TaskFormData): FormErrors => {
  const errors: FormErrors = {};

  // Title validation
  if (!formData.title.trim()) {
    errors.title = "Title is required";
  } else if (formData.title.length > 20) {
    errors.title = "Title cannot exceed 50 characters";
  }

  // Description validation
  if (formData.description && formData.description.length > 100) {
    errors.description = "Description cannot exceed 200 characters";
  }

  // Due date validation
  if (!formData.dueDate) {
    errors.dueDate = "Due date is required";
  } else if (
    new Date(formData.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
  ) {
    // Compare ignoring time
    errors.dueDate = "Due date cannot be in the past";
  }

  return errors;
};
