<template>
  <div class="form-wrap">
    <div class="flex items-center justify-between">
      <h2>Create new todo</h2>
      <div class="toggle-buttons">
        <button v-if="isShowed" class="button-default" @click="onHide">Hide</button>
        <button v-else class="button-destructive" @click="onShow">Show!</button>
      </div>
    </div>

    <div v-if="isShowed">
      <form>
        <div class="form-block">
          <label for="name">Your new task name</label>
          <input
            id="name"
            v-model="taskTitle"
            @focus="
              () => {
                isAttention = false
              }
            "
            type="text"
            placeholder="Your new todo name"
            @input="handleInput"
          />
        </div>

        <div class="form-block">
          <label for="tasks">Your new task</label>
          <textarea
            id="tasks"
            v-model="tasks"
            @focus="onFocus"
            @keydown="handleKeyDown"
            placeholder="Type new task here."
            rows="5"
            class="fixed-textarea"
          ></textarea>
        </div>

        <div class="buttons-group">
          <p v-show="isAttention" class="attention-message">All fields for creation are not filled in!</p>
          <button class="button-default" @click="deleteTask">Cancel</button>
          <button class="button-secondary" @click="createTask">Create!</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import type { TaskType, TodoType } from '@/types'
import { useTodosStore } from '@/store/todoList.store'
import '@/assets/css/styles.css'

const taskTitle = ref<string>('')
const tasks = ref<string>('')
const entersCount = ref<number>(1)
const isAttention = ref<boolean>(false)
const isShowed = ref<boolean>(false)

const todosStore = useTodosStore()

const lastTodoId = computed(() => {
  if (!todosStore.todoList.length) return 0
  return todosStore.todoList[todosStore.todoList.length - 1].id
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  taskTitle.value = target.value.toUpperCase()
}

const onFocus = () => {
  isAttention.value = false
  if (!tasks.value) {
    tasks.value = `${entersCount.value}. `
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    entersCount.value += 1
    tasks.value += `\n${entersCount.value}. `
  }
}

const updateRefs = () => {
  tasks.value = ''
  taskTitle.value = ''
  entersCount.value = 1
  isAttention.value = false
}

const deleteTask = (event: Event) => {
  event.preventDefault()
  updateRefs()
}

const createTask = (event: Event) => {
  event.preventDefault()
  if (tasks.value.length && taskTitle.value.length) {
    const tasksArr: Array<TaskType> = tasks.value.split('\n').map((task, index) => ({
      id: index + 1,
      task: task,
      isDone: false,
    }))
    const newTodo: TodoType = {
      id: lastTodoId.value + 1,
      title: taskTitle.value,
      tasks: tasksArr,
    }
    todosStore.createNewTodo(newTodo)
    updateRefs()
    return
  }
  isAttention.value = true
}

const onHide = () => {
  isShowed.value = false
}

const onShow = () => {
  isShowed.value = true
}

</script>

<style scoped></style>