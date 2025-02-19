<template>
  <div class="task-body-wrapp">
    <h2 class="task-body-title">TASKS IN TODO</h2>
    <div class="task-body">
      <div v-for="task in tasks" :key="task.id">
        <div class="task-raw">
          <div v-if="editTaskId && editTaskId === task.id" class="task-edit">
            <div>
              <label for="name">Edit task</label>
              <input id="name" v-model="taskById.label" type="text" class="task-input" placeholder="Edit task" />
            </div>
          </div>
          <div v-else class="checkbox-wrapp">
            <input type="checkbox" v-model="task.isDone" :id="task.id" />
            <label :for="task.id">{{
              task.task.split('. ').splice(1).join('. ')
                ? task.task.split('. ').splice(1).join('. ')
                : tasksInStore
                    .filter((item) => item.id === task.id)[0]
                    .task.split('. ')
                    .splice(1)
                    .join('. ')
            }}</label>
          </div>
          <div class="tasks-button-group">
            <button
              v-if="isShowCancelButton.includes(task.id)"
              class="button-destructive"
              @click="cancelChanges(task.id)"
            >
              Cancel Editing
            </button>

            <template v-if="editTaskId && editTaskId === task.id">
              <button class="button-default" @click="cancelEditing">Cancel</button>
              <button class="button-secondary" @click="setNewTaskTitle">Done!</button>
            </template>

            <template v-else>
              <button class="button-default" @click="getEditTaskId(task.id)">editTask</button>
              <button class="button-secondary" @click="deleteTask(task.id)">deleteTask</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="new-task-wrapp">
    <div class="new-task">
      <h2 class="text-lg mr-5">Create new task</h2>
      <div>
        <button class="button-default" v-if="isShowed" @click="onHide">Hide</button>
        <button v-else class="button-destructive" @click="onShow">Show!</button>
      </div>
    </div>

    <div v-if="isShowed">
      <form>
        <div class="task-body-wrapp">
          <label for="name">New task</label>
          <input id="name" v-model="taskText" type="text" placeholder="New task" />
        </div>

        <div class="task-title-button-group">
          <button class="button-default" @click="deleteNewTask">Cancel</button>
          <button class="button-secondary" :disabled="!taskText.length" @click="createTask">Create!</button>
        </div>
      </form>
    </div>
  </div>

  <DialogWindow
    v-if="showDialog"
    :title="`Delete task ?`"
    :description="`Are you sure you want to delete task?`"
    @closeDialog="closeDialog"
    @deleteTodoPermanently="deleteTaskPermanently"
  />
</template>

<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref, computed, defineProps, defineEmits } from 'vue'
import type { TaskType, currentTasksType } from '@/types'
import DialogWindow from './DialogWindow.vue'
import '@/assets/css/styles.css'

interface Props {
  tasksInStore: TaskType[]
  tasks: TaskType[]
}
const props = defineProps<Props>()

const { cloneDeep } = _

const emit = defineEmits(['deleteTaskPermanently', 'setNewTaskTitle', 'createTask'])

const showDialog = ref<boolean>(false)
const isShowed = ref<boolean>(false)
const taskText = ref<string>('')
const deletedTaskId = ref<number | null>(null)
const currentTasks = reactive<currentTasksType[]>(
  cloneDeep(
    props.tasks.map((task) => ({
      id: task.id,
      label: task.task.split('. ').splice(1).join('. '),
    })),
  ),
)
const editTaskId = ref<number | null>(null)

const isShowCancelButton = computed(() => {
  const modifiedTasks: number[] = props.tasks
    .filter((task) => task.task.split('. ').splice(1).join('. '))
    .map((task) => task.id)

  const idsForFilter: number[] = []

  modifiedTasks.forEach((id) => {
    const index1 = props.tasksInStore.findIndex((task) => task.id === id)
    const index2 = props.tasks.findIndex((task) => task.id === id)

    if (
      index1 !== -1 &&
      index2 !== -1 &&
      props.tasksInStore[index1].task.split('. ').splice(1).join('. ') !==
        props.tasks[index2].task.split('. ').splice(1).join('. ')
    ) {
      idsForFilter.push(id)
    }
  })

  return idsForFilter
})

const deleteTask = (id: number) => {
  showDialog.value = true
  deletedTaskId.value = id
}

const closeDialog = () => {
  showDialog.value = false
}

const deleteTaskPermanently = () => {
  if (deletedTaskId.value) {
    emit('deleteTaskPermanently', deletedTaskId.value)
    const index = currentTasks.findIndex((task) => task.id === deletedTaskId.value)
    currentTasks.splice(index, 1)
  }
  deletedTaskId.value = null
  showDialog.value = false
}

const taskById = computed(() => {
  if (editTaskId.value) {
    const index = currentTasks.findIndex((task) => task.id === editTaskId.value)

    if (index !== -1) {
      return currentTasks[index]
    }
  }
  return null
})

const getEditTaskId = (id: number) => {
  editTaskId.value = id
}

const cancelEditing = () => {
  editTaskId.value = null
}

const cancelChanges = (id: number) => {
  emit('setNewTaskTitle', id, '')
}

const setNewTaskTitle = () => {
  const index = currentTasks.findIndex((task) => task.id === editTaskId.value)
  if (index !== -1) {
    emit('setNewTaskTitle', editTaskId.value, currentTasks[index].label)
  }

  editTaskId.value = null
}

const onHide = () => {
  isShowed.value = false
}

const onShow = () => {
  isShowed.value = true
}

const deleteNewTask = (event: Event) => {
  event.preventDefault()
  taskText.value = ''
}

const createTask = (event: Event) => {
  event.preventDefault()

  currentTasks.push({
    id: props.tasks[props.tasks.length - 1].id + 1,
    label: taskText.value,
  })

  emit('createTask', {
    id: props.tasks[props.tasks.length - 1].id + 1,
    task: `${props.tasks.length + 1}. ${taskText.value}`,
    isDone: false,
  })

  taskText.value = ''
}
</script>

<style scoped></style>
