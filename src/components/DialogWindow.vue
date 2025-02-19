<template>
  <div id="modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">{{ props.title }}</h2>
        <span class="close" id="close-modal" @click="closeDialog">&times;</span>
      </div>
      <div class="modal-body">
        <p>{{ props.description }}</p>
      </div>
      <div class="modal-footer buttons-group">
        <button id="no-button" class="button button-default" @click="closeDialog">No</button>
        <button id="ok-button" class="button button-secondary" @click="deleteTodoPermanently">Ok</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import '@/assets/css/styles.css'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['closeDialog', 'deleteTodoPermanently'])

const closeDialog = () => {
  emit('closeDialog')
}

const deleteTodoPermanently = () => {
  emit('deleteTodoPermanently')
}
</script>

<style scoped></style>
