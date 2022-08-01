<template>
  <div class="fl-modal">
    <h2 class="fl-modal__title"></h2>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'fl-modal',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>

</style>
