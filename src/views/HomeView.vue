<template>
  <div class="home">
    <div>
      <StartComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StartComponent from '@/components/StartComponent.vue'

export default defineComponent({
  components: {
    StartComponent,
  },
});
</script>
