import {words} from '@/mock/words';
import {LETTERS_COUNT} from '@/config';

type TGetWordIdCallback = (index: number) => void;

type TResultType = 'success' | 'error';

interface ILetterCheckResult {
    letter: string;
    exist: boolean;
    position: boolean;
}

interface ICheckResult {
    type: TResultType;
    checkResults: ILetterCheckResult[];
}

type TCheckWordCallback = (checkResults: ICheckResult) => void;

type TGetWordByIdCallback = (word: string) => void;

export const getWordId = (callback: TGetWordIdCallback) => {
    const randomIndex = Math.floor(Math.random() * (words.length + 1));
    callback(randomIndex);
};

export const checkWord = (index: number, userWord: string, callback: TCheckWordCallback) => {
    const word = words[index];
    const checkResults: ILetterCheckResult[] = [];

    if (!words.includes(userWord)) {
        callback(<ICheckResult> {
            type: 'error',
            checkResults: []
        });
        return;
    }

    for (let i = 0; i < LETTERS_COUNT; i++) {
        const userWorkLetter = userWord[i];
        const sourceWordLetter = word[i];

        const exist = word.includes(userWorkLetter);
        const position = userWorkLetter === sourceWordLetter;

        checkResults.push({
            letter: userWorkLetter,
            exist,
            position,
        } as ILetterCheckResult);
    }

    callback(<ICheckResult> {
        type: 'success',
        checkResults
    });
};

export const getWordById = (id: number, callback: TGetWordByIdCallback) => {
    callback(words[id]);
};
