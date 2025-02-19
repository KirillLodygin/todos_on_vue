<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold mb-6 pb-2">TODO_LIST</h1>
    <section>
      <NewTodoForm />
    </section>
    <section>
      <TodosComponent />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NewTodoForm from '@/components/NewTodoForm.vue'
import TodosComponent from '@/components/TodosComponent.vue'

export default defineComponent({
  components: {
    TodosComponent,
    NewTodoForm,
  },
})
</script>

<style scoped></style>
