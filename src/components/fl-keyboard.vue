<template>
  <article class="fl-keyboard">
    <h2 class="visually-hidden">Клавиатура</h2>
    <form @submit.prevent="onSubmit">
      <div v-for="(row, index) in layout" :key="index" class="fl-keyboard__row">
        <div v-if="index === layout.length - 1" class="fl-keyboard__col">
          <button
            class="fl-keyboard__button fl-keyboard__button_icon fl-keyboard__button_white"
            type="button"
            @click="onBackspaceClick"
          >
            <fl-left-arrow-icon class="fl-keyboard__arrow-icon"/>
          </button>
        </div>
        <div v-for="letter in row" :key="letter" class="fl-keyboard__col">
          <button
            v-text="letter"
            class="fl-keyboard__button"
            type="button"
            @click.prevent="onInputLetter(letter)"
            :disabled="disabledKeys.includes(letter)"
          />
        </div>
        <div v-if="index === layout.length - 1" class="fl-keyboard__col">
          <button class="fl-keyboard__button fl-keyboard__button_icon fl-keyboard__button_yellow">
            <fl-ok-icon class="fl-keyboard__ok-icon"/>
          </button>
        </div>
      </div>
    </form>
  </article>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FlLeftArrowIcon from '@/assets/fl-left-arrow-icon.vue';
import FlOkIcon from '@/assets/fl-ok-icon.vue';

export default defineComponent({
  name: 'fl-keyboard',
  props: {
    disabledKeys: {
      type: Array,
      default: () => [],
    }
  },
  emits: {
    input: (letter: string) => {
      return Boolean(letter);
    },
    backspace: () => true,
    submit: () => true,
  },
  components: {
    FlLeftArrowIcon,
    FlOkIcon,
  },
  data() {
    return {
      layout: [
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
      ] as string[][],
    };
  },
  methods: {
    onInputLetter(letter: string): void {
      this.$emit('input', letter);
    },
    onBackspaceClick(): void {
      this.$emit('backspace');
    },
    onSubmit(): void {
      this.$emit('submit');
    },
  },
});
</script>

<style lang="scss" scoped>
  .fl-keyboard {
    --key-spacing: 4px;
  }

  .fl-keyboard__row {
    display: flex;
    justify-content: center;

    &:not(:last-child) {
      margin-bottom: var(--key-spacing);
    }
  }

  .fl-keyboard__col {
    &:not(:last-child) {
      margin-right: var(--key-spacing);
    }
  }

  .fl-keyboard__button {
    padding: 0;
    width: 20px;
    height: 30px;
    text-align: center;
    color: var(--white);
    background-color: var(--black);
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 1px 0 var(--white);

    &:disabled {
      color: var(--white);
      background-color: var(--gray);
    }
  }

  .fl-keyboard__button_icon {
    width: 30px;
  }

  .fl-keyboard__button_white {
    background-color: var(--white);
  }

  .fl-keyboard__button_yellow {
    background-color: var(--yellow);
  }

  .fl-keyboard__arrow-icon {
    width: 12px;
    height: 12px;
    fill: var(--black);
  }

  .fl-keyboard__ok-icon {
    width: 12px;
    height: 12px;
    stroke: var(--black);
  }
</style>
