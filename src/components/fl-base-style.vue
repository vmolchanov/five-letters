<template>
  <slot/>
</template>

<script lang="ts">
export default {
  name: 'fl-base-style',
};
</script>

<style>
  :root {
    --black: rgb(20, 20, 20);
    --gray: rgb(95, 95, 95);
    --white: #ffffff;
    --yellow: rgb(255, 226, 0);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 10px;
    background-color: var(--black);
    font-family: Arial, sans-serif;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
</style>
