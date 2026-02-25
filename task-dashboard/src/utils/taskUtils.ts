import type { Task,TaskSort } from "../types";
const sortTasks = (tasks: Task[], sortBy: TaskSort): Task[] => {
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
export default sortTasks;