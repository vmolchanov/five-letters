<template>
  <article class="fl-game-view">
    <h1 class="visually-hidden">Игра 5 слов</h1>
    <div class="fl-game-view__field">
      <fl-field :words="words"/>
    </div>
    <div class="fl-game-view__keyboard">
      <fl-keyboard
        :disabledKeys="Array.from(excludedLetters)"
        @input="onLetterInput"
        @backspace="onBackspaceClick"
        @submit="onEnterClick"
      />
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {LETTERS_COUNT, WORDS_COUNT} from '@/config';
import FlField from '@/components/fl-field.vue';
import FlKeyboard from '@/components/fl-keyboard.vue';
import {checkWord, getWordId, getWordById} from '@/api/word';
import {IWord} from "@/models/word";

export default defineComponent({
  name: 'fl-game',
  components: {
    FlField,
    FlKeyboard,
  },
  created(): void {
    this.initGame();
  },
  data() {
    return {
      currentLetterIndex: 0 as number,
      currentWordIndex: 0 as number,
      excludedLetters: new Set() as Set<string>,
      wordId: -1 as number,
      words: [] as IWord[],
    };
  },
  methods: {
    initGame() {
      this.initWords();
      getWordId((id: number) => {
        this.wordId = id;
      });
      this.excludedLetters.clear();
      this.currentWordIndex = 0;
    },
    initWords(): void {
      this.words = new Array(WORDS_COUNT)
        .fill({})
        .map(() => ({
          letters: new Array(LETTERS_COUNT).fill(''),
          complete: false,
        }));
    },
    onLetterInput(letter: string): void {
      if (this.currentLetterIndex >= LETTERS_COUNT) {
        return;
      }
      this.words[this.currentWordIndex].letters[this.currentLetterIndex++] = letter;
    },
    onBackspaceClick(): void {
      if (this.currentLetterIndex === 0) {
        return;
      }
      this.words[this.currentWordIndex].letters[--this.currentLetterIndex] = '';
    },
    onEnterClick(): void {
      if (this.currentLetterIndex < LETTERS_COUNT) {
        return;
      }
      checkWord(this.wordId, this.words[this.currentWordIndex].letters.join(''), checkResults => {
        this.words[this.currentWordIndex].complete = true;
        this.words[this.currentWordIndex].checkResults = checkResults;
        this.currentWordIndex++;
        this.currentLetterIndex = 0;
        checkResults.forEach(checkResult => {
          if (!checkResult.exist) {
            this.excludedLetters.add(checkResult.letter);
          }
        });
        const isWin = checkResults.every(({exist, position}) => exist && position);
        if (isWin) {
          alert('Победа');
          this.initGame();
          return;
        }
        if (this.currentWordIndex === WORDS_COUNT) {
          getWordById(this.wordId, word => {
            alert(`Поражение!\nБыло загадано слово ${word}`);
            this.initGame();
          });
        }
      });
    },
  },
})
</script>

<style scoped>
  .fl-game-view__field {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .fl-game-view__keyboard {
    display: flex;
    justify-content: center;
    margin-top: 70px;
  }
</style>
