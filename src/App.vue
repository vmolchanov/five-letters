<template>
  <div class="App">
    <fl-base-style>
      <router-view/>
    </fl-base-style>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FlBaseStyle from './components/fl-base-style.vue';

export default defineComponent({
  components: {
    FlBaseStyle,
  },
});
</script>

<style lang="scss" scoped>
</style>
