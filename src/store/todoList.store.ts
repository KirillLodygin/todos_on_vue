import { defineStore } from 'pinia'
import _ from 'lodash'
import type { TaskType, TodoType, ITodosList } from '@/types'

const { cloneDeep } = _

const defaultValue: ITodosList = {
  todoList: [],
  openTodoId: null,
  isNewTodoListStarted: false,
}

export const useTodosStore = defineStore('todos', {
  state: () => defaultValue,

  getters: {
    getTodoById: (state: ITodosList) => (id: number) => {
      return state.todoList.filter((todo) => todo.id === id)[0]
    },
  },

  actions: {
    startNewTodoList() {
      this.isNewTodoListStarted = true
    },

    setTodoList(jsonStr: string) {
      this.todoList = JSON.parse(jsonStr)
    },

    updateOpenTodoId(val: number | null) {
      this.openTodoId = val
    },

    clearTodoList() {
      this.openTodoId = null
      this.todoList = []
      this.isNewTodoListStarted = false
      localStorage.setItem('todoList', '')
    },

    createNewTodo(todo: TodoType) {
      this.todoList.push(todo)
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
    },

    deleteTodo(id: number) {
      const index = this.todoList.findIndex((todo) => todo.id === id)
      this.todoList.splice(index, 1)
      localStorage.setItem('todoList', this.todoList.length ? JSON.stringify(this.todoList) : '')
      this.openTodoId = null
    },

    updateTodo(id: number, title: string, tasks: Array<TaskType>) {
      const index = this.todoList.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        if (title) {
          this.todoList[index].title = title
        }
        if (tasks && tasks.length) {
          if (cloneDeep) {
            this.todoList[index].tasks = cloneDeep(tasks)
            localStorage.setItem('todoList', JSON.stringify(this.todoList))
          }
        }
      }
    },
  },
})
