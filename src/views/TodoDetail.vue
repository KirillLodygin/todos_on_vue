<template>
  <TasksComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TasksComponent from '@/components/TasksComponent.vue'
export default defineComponent({
  components: {
    TasksComponent,
  },
})
</script>

<style scoped></style>
