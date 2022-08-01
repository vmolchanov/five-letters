export interface ILetterCheckRusult {
    letter: string;
    exist: boolean;
    position: boolean;
}

export interface IWord {
    letters: string[],
    complete: boolean;
    checkResults?: ILetterCheckRusult[];
}
