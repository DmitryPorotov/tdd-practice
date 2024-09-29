export default class AlignColumns {
    private words: string[][] = [];
    constructor(private text: string) {
    }
    splitIntoWords() {
        const retVal: number[] = [];
        const lines = this.text.split('\n');
        for (const line of lines) {
            const words = line.split('$');
            const filteredWords = words.reduce<string[]>((acc: string[], currentValue: string) => {
                    if (currentValue) acc.push(currentValue);
                    return acc
                }, []);
            this.words.push(filteredWords);
            retVal.push(filteredWords.length);
        }
        return retVal;
    }

    toAlignedString() {
        const maxWords = Math.max(...this.words.map(w => w.length));
        const lines = (new Array<string>(this.words.length));
        for (let i = 0; i < lines.length; lines[i] = '', i ++);
        for (let i = 0; i < maxWords; i ++) {
            const maxWordLen = Math.max(...this.words.map(w=> w[i] ? w[i].length : 0));
            for (let j = 0; j < this.words.length; j++) {
                lines[j] += this.words[j][i] ? this.words[j][i].padEnd(maxWordLen + 1) : '';
            }
        }
        return lines.join('\n');
    }
}

export const text = `Given$a$text$file$of$many$lines,$where$fields$within$a$line$
are$delineated$by$a$single$'dollar'$character,$write$a$program
that$aligns$each$column$of$fields$by$ensuring$that$words$in$each$
column$are$separated$by$at$least$one$space.`;