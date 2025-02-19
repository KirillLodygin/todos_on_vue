<template>
  <div class="container">
    <button class='start-button' @click="startNewTodoList"> Приступить к созданию списка задач </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '@/store/todoList.store'
import '@/assets/css/styles.css'

const router = useRouter()
const todosStore = useTodosStore()

onBeforeMount(() => {
  const todoList = localStorage.getItem('todoList') || ''
  const todoId = localStorage.getItem('todoId') || ''
  if (todoList.length) {
    todosStore.setTodoList(todoList)
    todoId ? router.push(`/todo_list/${todoId}`) : router.push('/todo_list')
  }
})

const startNewTodoList = (event: Event) => {
  event.preventDefault()
  todosStore.startNewTodoList()
  router.push('/todo_list')
}
</script>

<style scoped>
</style>