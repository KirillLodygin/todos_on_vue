<template>
  <div>
    <div v-if="titleIsNotEditing" class="task-title-wrapp">
      <h2>{{ newTitle.toUpperCase() || oldTitle.toUpperCase() }}</h2>
      <div>
        <button v-if="!newTitle.length" class="button-default" @click="editTitle">Edit</button>
        <button v-else class="button-default" @click="cancelEditing">Cancel Editing</button>
      </div>
    </div>

    <div v-else>
      <div class="new-name">
        <label for="name">New todo name</label>
        <input id="name" v-model="taskTitle" type="text" placeholder="Your new todo name" />
      </div>
      <div class="task-title-button-group">
        <button class="button-destructive" @click="cancelEditing">Cancel</button>
        <button class="button-secondary" @click="setNewTaskTitle">Done!</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import '@/assets/css/styles.css'

interface Props {
  newTitle: string
  oldTitle: string
}
const props = defineProps<Props>()

const titleIsNotEditing = ref<boolean>(true)
const taskTitle = ref<string>(props.oldTitle.toUpperCase() || '')
const emit = defineEmits(['updateNewTitle'])

const cancelEditing = () => {
  emit('updateNewTitle', '')
  titleIsNotEditing.value = true
}

const editTitle = () => {
  titleIsNotEditing.value = false
}

const setNewTaskTitle = () => {
  emit('updateNewTitle', taskTitle.value)
  titleIsNotEditing.value = true
}
</script>

<style scoped></style>
