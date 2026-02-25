/**.  export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
} */

/**TaskListProps is a TypeScript interface
 * that defines what data and functions the TaskList component receives from its parent (usually Dashboard). */
import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks found .</p>;
  }
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
export default TaskList;
