                                              Reflection Document
                        
                                            Write a reflection addressing:

### How you implemented React and TypeScript features

- I used TypeScript to define strict types for tasks, form data, filters, and component props, ensuring only valid values are used and catching errors at compile time. In React, I managed state with useState for tasks, editing tasks, filters, and sorting, and used useEffect to prefill the form when editing. I implemented controlled components in the form so input values are bound to the state, allowing easy validation and resetting. Components communicate via props and callbacks, like passing edit, delete, and status-change handlers from Dashboard to TaskList and TaskItem. I also created a utility function for sorting tasks, which is called in Dashboard to render a sorted and filtered task list. Finally, React re-renders the UI automatically whenever state changes, while TypeScript ensures type safety across all components.




### The challenges you encountered and how you overcame them

- One problem I faced was making sure tasks, filters, sorting, and editing all worked together correctly in different components. I fixed this by keeping all the state in the Dashboard component. Dashboard handles adding, editing, deleting, filtering, and sorting tasks. The child components — TaskForm, TaskFilter, TaskList and TaskItem only receive the data and functions they need from Dashboard through props. This way, the components stay simple, the UI always shows the correct information, and the code is easier to manage and understand.

### Your approach to component composition and state management

 - The Dashboard component is the main place where all the state is stored. It keeps track of the list of tasks, which task is being edited, the current filters, and the sort order. The child components — TaskForm, TaskFilter, and TaskList — receive the necessary data and functions from Dashboard through props. TaskForm is responsible for adding new tasks or updating existing ones, TaskFilter allows the user to change filters or the sorting option, and TaskList displays all the tasks using TaskItem components. Whenever something changes, like a task being edited or a filter being applied, Dashboard updates the state and passes the new data down to the children. This approach keeps the state centralized, ensures the UI stays consistent, and allows the components to be reusable and easy to understand.