export type Index = number;

export default class TwoDArrayGenerator {
    private array: number[][] = [];
    constructor(private size: number = 5, private from: number = 0, private to: number = 100) {

    }

    makeRandom() {
        for (let i = 0; i < this.size; i++) {
            let arr = [];
            for (let j = 0; j < this.size; j++) {
                arr[j] = this.randomIntFromInterval();
            }
            this.array[i] = arr;
        }
        return this
    }

    makeConstant() {
        let x = 0;
        for (let i = 0; i < this.size; i++) {
            let arr = [];
            for (let j = 0; j < this.size; j++) {
                arr[j] = ++x;
            }
            this.array[i] = arr;
        }
        return this
    }

    fromString(str: string) {
        const rows = str.split('\n');
        for (const c of rows) {
            this.array.push(c.split('\t').map(x=>parseInt(x)))
        }
        return this
    }

    getAt(col: number, row: number): number {
        return this.array[row][col]
    }


    findMaxesInRow(row: number): Index[] {
        let maxes: Index[] = [];
        let maxNum = this.from - 1;
        for (let i = 0; i < this.array[row].length; i++)
        {
            if (this.array[row][i] == maxNum) {
                maxes.push(i)
            }
            else if (this.array[row][i] > maxNum) {
                maxes = [i]
                maxNum = this.array[row][i]
            }
        }
        return maxes;
    }

    checkIsMinAtColumn(col: number, row: number): boolean {
        let underCheck = this.getAt(col, row);
        for (let i = 0; i < this.array.length; i ++) {
            if (this.getAt(col, i) < underCheck) {
                return false
            }
        }
        return true
    }

    findSaddlePoints() {
        const saddlePoints: number[][] = [];
        for (let i = 0; i < this.array.length; i++) {
            const maxIdxsAtRow = this.findMaxesInRow(i);
            for (const colIdx of maxIdxsAtRow) {
                if (this.checkIsMinAtColumn(colIdx, i)) {
                    saddlePoints.push([colIdx, i])
                }
            }
        }
        return saddlePoints;
    }

    print(): void {
        let strings = [];
        for (const x of this.array) {
            strings.push(x.join('\t'));
        }
        console.log(strings.join('\n'));
    }

    private randomIntFromInterval(): number { // min included, max is not
        return Math.floor(Math.random() * (this.to - this.from) + this.from);
    }
}
