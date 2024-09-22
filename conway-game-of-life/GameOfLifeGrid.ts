import {IndexOutOfBoundsException, MalformedGridException, MalformedValueException} from "./exceptions";

export default class GameOfLifeGrid {
    private readonly grid: Uint8Array;
    constructor(private width: number, private height: number) {
        this.grid = new Uint8Array((width / 8) * height)
    }

    static fromString(gridStr: string): GameOfLifeGrid {
        const rows = gridStr.split('\n');
        let g: GameOfLifeGrid | null = null;
        for (let i = 0; i < rows.length; i++) {
            let rowLetters = rows[i].split('');
            if (rowLetters.length % 8 != 0) {
                throw new MalformedGridException('Grid width must be dividable by 8')
            }
            if (g == null) {
                g = new GameOfLifeGrid(rowLetters.length, rows.length)
            }
            if (g && g.width != rowLetters.length) {
                throw new MalformedGridException(`The width of row ${i} is ${rowLetters.length} which is different from the width of the grid (${g.width}).`)
            }
            for (let j = 0; j < rowLetters.length; j++) {
                g.setAt(j, i, rowLetters[j]);
            }
        }
        if (g == null) throw  new Error('Something went wrong.');
        return g;
    }

    calculateNext(): GameOfLifeGrid {
        const newGrid = new GameOfLifeGrid(this.width, this.height);
        for (let i = 0; i < this.height; i ++)
            for (let j = 0; j < this.width; j ++) {
                const sumNeighbours = this.sumNeighbours(j, i);
                const val = this.getAt(j, i);
                if (val) {
                    if (sumNeighbours < 2 || sumNeighbours > 3) {
                        newGrid.setAt(j, i, '-');
                    } else {
                        newGrid.setAt(j, i, 'o')
                    }
                }
                else {
                    if (sumNeighbours == 3) {
                        newGrid.setAt(j, i, 'o')
                    }
                    else {
                        newGrid.setAt(j, i, '-')
                    }
                }

            }
        return newGrid;
    }

    sumNeighbours(x: number, y: number): number {
        let sum = 0;
        for (let i = y - 1; i < y + 2; i ++)
            for (let j = x - 1; j < x + 2; j ++)
                try {
                    if (i != y || j != x)
                        // @ts-ignore
                        sum += this.getAt(j, i)
                } catch (e) {
                    if (!(e instanceof IndexOutOfBoundsException)) {
                        throw e;
                    }
                }
        return sum;
    }

    private setAt(x:number, y:number, value: string): boolean {
        const [byteNum, bitInByte] = this.getByteAndBitFromXAndY(x, y);
        if (value != '-' && value != 'o') {
            throw new MalformedValueException('Grid value should be "-" for a dead cell or "o" for an alive grid cell.');
        }
        let gridValue = this.grid[byteNum];
        const valueToWrite = value == 'o';
        if (valueToWrite) {
            gridValue |= 1 << bitInByte;
        }
        else {
            gridValue &= ~(1 << bitInByte);
        }
        this.grid[byteNum] = gridValue;
        return valueToWrite
    }

    private getByteAndBitFromXAndY(x:number,y:number): number[] {
        return [Math.floor(this.width / 8) * y + Math.floor(x / 8), x % 8]
    }

    getAt(x: number, y: number): boolean {
        if (x < 0 || y < 0) {
            throw new IndexOutOfBoundsException('Index under bound.')
        }
        if (x > this.width || y > this.height) {
            throw new IndexOutOfBoundsException('Index over bound.')
        }
        const [byteNum, bitInByte] = this.getByteAndBitFromXAndY(x, y);
        const byte = this.grid[byteNum];
        return Boolean(byte & (1 << bitInByte));
    }

    toString(): string {
        let str = '';
        for (let i = 0; i < this.height; i ++) {
            for (let j = 0; j < this.width; j ++) {
                str += this.getAt(j, i) ? 'o' : '-'
            }
            str += '\n'
        }
        return str;
    }
}