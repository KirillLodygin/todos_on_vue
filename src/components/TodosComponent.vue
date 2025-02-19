<template>
  <div class="todo-list-wrapp">
    <div v-if="todoList.length" class="clear-button-block">
      <div>{{ todoList.length }} items in list</div>
      <button class="button-default" @click="clearTodos($event)">Clear Todos</button>
    </div>

    <h2>TODOS</h2>
    <template v-if="todoList.length">
      <div class="todo-list-block">
        <div v-for="todo in todoList" :key="todo.id" class="todo-block">
          <button class="button-transparent" @click="selectToView(todo.id)">
            <div class="todo-header">
              {{ todo.title.toUpperCase() }}
            </div>
          </button>
          <button class="button-default" @click="deleteTodo(todo.id)">Delete todo!</button>

          <div v-for="(task, index) in todo.tasks" :key="task.id" class="todo-body">
            <template v-if="index < 5">
              <div v-for="item in returnTaskString(task.task)" :key="item" :class="{ 'text-red-700': task.isDone }">
                {{ item }}
              </div>
            </template>
            <template v-if="index === 5">
              <div class="ellipsis-text">...</div>
            </template>
          </div>
        </div>
      </div>
    </template>

    <DialogWindow
      v-if="showDialog"
      :title="`Delete todo ?`"
      :description="`Are you sure you want to delete todo?`"
      @closeDialog="closeDialog"
      @deleteTodoPermanently="deleteTodoPermanently"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '@/store/todoList.store'
import DialogWindow from './DialogWindow.vue'
import '@/assets/css/styles.css'

const router = useRouter()

const todosStore = useTodosStore()

const showDialog = ref<boolean>(false)
const idToDelete = ref<null | number>(null)

const todoList = computed(() => todosStore.todoList)
const isNewTodoListStarted = computed(() => todosStore.isNewTodoListStarted)

onBeforeMount(() => {
  const todoJSON = localStorage.getItem('todoList') || ''
  if (todoJSON.length) {
    todosStore.setTodoList(todoJSON)
    return
  }

  if (!todoList.value.length && !isNewTodoListStarted.value) {
    router.push('/')
  }
})

const returnTaskString = (str: string) => {
  let newStr: string | Array<string> = str.length > 50 ? str.slice(0, 47) + '...' : str
  newStr = newStr.split('. ')
  newStr[0] = `${newStr[0]}.`
  return newStr
}

const selectToView = (id: number) => {
  todosStore.updateOpenTodoId(id)
  localStorage.setItem('todoId', String(id))
  router.push(`/todo_list/${id}`)
}

const clearTodos = (event: Event) => {
  event.preventDefault()
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
}

const deleteTodoPermanently = () => {
  if (idToDelete.value) {
    todosStore.deleteTodo(idToDelete.value)
    idToDelete.value = null
  } else {
    todosStore.clearTodoList()
  }
  showDialog.value = false
}

const deleteTodo = (id: number) => {
  showDialog.value = true
  idToDelete.value = id
}
</script>

<style scoped></style>
