/** User types → TaskForm
Submit → onAddTask
App → updates state
TaskList → receives tasks
TaskItem → displays task */

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskSort = "dueDate" | "priority" | "status";
 
//main task structure interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

// export interface TaskFormProps {
//   onAddTask: (
//     id: string,
//     title: string,
//     priority: TaskPriority
//   ) => void;
// }
//// TaskForm data (single object)
export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
}

///** 2. Form Data Structure **/
// Using Pick ensures that if 'Task' changes, the form stays in sync
// export interface TaskFormData extends Pick<Task, 'title' | 'description' | 'priority' | 'dueDate'> {}


// TaskForm props
export interface TaskFormProps {
  onAddTask: (data: TaskFormData) => void;
  onUpdateTask?: (data: TaskFormData) => void;
  initialData?: TaskFormData;
  isEditing?: boolean;
}
 
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void; 
}

// types/index.ts
export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}


// TaskList props
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}
//types/index.ts
// export interface TaskFilterProps {
//   onFilterChange: (filters: {
//     status?: TaskStatus;
//     priority?: 'low' | 'medium' | 'high';
//   }) => void;
// }

// export interface TaskFilterProps {
//   filters: { status: string; priority: string }; // empty string by default
//   onFilterChange: (newFilters: { status: string; priority: string }) => void;
// }

// types/index.ts
export interface TaskFilterProps {
  filters: {
    status: TaskStatus | "";
    priority: TaskPriority | "";
  };
  onFilterChange: (newFilters: {
    status?: TaskStatus | "";
    priority?: TaskPriority | "";
  }) => void;
  sortKey?: TaskSort;
  onSortChange?: (sortKey: TaskSort) => void;
}