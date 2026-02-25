
import type { TaskFilterProps, TaskPriority, TaskStatus,TaskSort } from "../../types";

function TaskFilter({ filters, onFilterChange,sortKey,onSortChange }: TaskFilterProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl mb-6 shadow-sm">
      <select
      //  {/* Status Filter */}
      className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:border-gray-400 transition-colors"
        value={filters.status}
        onChange={e => onFilterChange({ status: e.target.value as TaskStatus | "" })}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

        {/* Priority Filter */}

      <select
      className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:border-gray-400 transition-colors"
        value={filters.priority}
        onChange={e => onFilterChange({priority: e.target.value as TaskPriority |"" })}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
       {/* Sort Dropdown */}
       {onSortChange && sortKey && (
        <select
          value={sortKey}
          onChange={e => onSortChange(e.target.value as TaskSort)}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      )}
    </div>
  );
}

export default TaskFilter;