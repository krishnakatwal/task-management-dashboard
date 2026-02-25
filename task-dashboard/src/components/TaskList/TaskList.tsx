/**.  export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
} */

/**TaskListProps is a TypeScript interface
 * that defines what data and functions the TaskList component receives from its parent (usually Dashboard). */
import type { TaskListProps } from "../../types";

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }
  return (
    <ul className="space-y-3">

      {/* list rendering with proper key management */}
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
          </div>
          <div>
            {/* Handle task status updates */}
            {task.status !== "completed" && (
              <button onClick={() => onStatusChange(task.id, "completed")}>
                Mark Done
              </button>
            )}
            {/* Implement task deletion */}
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default TaskList;
