export type TaskType = {
  id: number
  task: string
  isDone: boolean
}

export type TodoType = {
  id: number
  title: string
  tasks: Array<TaskType>
}

export type currentTasksType = {
  id: number
  label: string
}

export interface ITodosList {
  todoList: Array<TodoType>
  openTodoId: number | null
  isNewTodoListStarted: boolean
}
