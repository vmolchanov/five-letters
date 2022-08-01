<template>
  <div class="fl-field">
    <div
      v-for="(word, index) in words"
      :key="index"
      class="fl-field__row"
    >
      <div
        v-for="(letter, letterIndex) in word.letters"
        :key="letterIndex"
        v-text="letter.toUpperCase()"
        :class="getCellClasses(letter, word.complete, word?.checkResults?.at(letterIndex))"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {ILetterCheckRusult, IWord} from '@/models/word';

export default defineComponent({
  name: 'fl-field',
  props: {
    words: {
      type: Array,
      required: true,
      validator(words: IWord[]) {
        return words.every(
          word => Array.isArray(word?.letters) && typeof word?.complete === 'boolean'
        );
      },
    },
  },
  methods: {
    getCellClasses(letter: string, complete: boolean, checkResult: ILetterCheckRusult) {
      return {
        'fl-field__col': true,
        'fl-field__col_dark': complete && !checkResult.exist,
        'fl-field__col_white': complete && checkResult.exist && !checkResult.position,
        'fl-field__col_yellow': complete && checkResult.exist && checkResult.position,
      };
    }
  },
});
</script>

<style lang="scss" scoped>
  .fl-field {
    display: flex;
    flex-direction: column;
  }

  .fl-field__row {
    display: flex;
    &:not(:last-child) {
       margin-bottom: 10px;
     }
    .fl-field__col {
      width: 60px;
      height: 60px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
      color: var(--white);
      border-radius: 5px;
      border: 1px solid var(--yellow);
      background-color: var(--black);

      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    .fl-field__col_dark {
      color: var(--white);
      background-color: var(--gray);
    }

    .fl-field__col_white {
      color: var(--black);
      background-color: var(--white);
    }

    .fl-field__col_yellow {
      color: var(--black);
      background-color: var(--yellow);
    }
  }

</style>
