<template>
  <div class="App">
    <fl-base-style>
<!--      <router-view/>-->
      <fl-game/>
    </fl-base-style>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FlBaseStyle from './components/fl-base-style.vue';
import FlGame from "@/views/fl-game-view/fl-game-view.vue";

export default defineComponent({
  components: {
    FlGame,
    FlBaseStyle,
  },
});
</script>

<style lang="scss" scoped>
</style>
