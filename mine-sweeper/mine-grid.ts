export default class MineGrid {
    private grid: Array<Uint8Array> = [];
    private playerLocation: number[] = [-1, -1];
    constructor(width: number = 8, heights: number = 8, private mineProbability = 0.2) {
        if (mineProbability >= 1) {
            throw new Error('Mine probability can\'t be 1.');
        }
        for (let i = 0; i < heights; i ++) {
            this.grid.push(new Uint8Array(8));
        }
    }

    get dimensions(): number[] {
        return [this.grid[0].length, this.grid.length];
    }

    initMines() {
        for (const row of this.grid) {
            for (let i = 0; i < row.length; i ++) {
                row[i] = Math.random() < this.mineProbability ? 1 : 0;
            }
        }
    }

    initPlayer(): number[] {
        const possibleStartPoints = [];
        for (let i = 0; i < this.grid[this.grid.length - 1].length; i ++) {
            if (!(this.grid[this.grid.length - 1][i] & 1)) {
                possibleStartPoints.push(i)
            }
        }
        if (!possibleStartPoints.length) {
            throw new NoPlaceForPlayerAtBottomRowException('Bottom row is all mines');
        }
        const pos = Math.floor(Math.random() * possibleStartPoints.length);
        this.playerLocation = [pos, this.grid.length - 1];
        return this.playerLocation;
    }

    getPlayerLocation(): number[] {
        return [...this.playerLocation];
    }

    validate(): boolean {
        const toVisit = [this.playerLocation];
        const mines = this.getGridMines();
        while (toVisit.length) {
            let v: number[] = toVisit.pop() as number[];
            if (v[1] === 0) {
                return true
            }
            if (!this.isVisited(v)) {
                this.visit(v);
                if (v[1] > 0 && !mines[v[0]][v[1] - 1]) {
                    toVisit.push([v[0], v[1] - 1]);
                }
                if (v[0] > 0 && !mines[v[0] - 1][v[1]]) {
                    toVisit.push([v[0] - 1, v[1]]);
                }
                if (v[0] < this.grid[0].length - 1 && !mines[v[0] + 1][v[1]]) {
                    toVisit.push([v[0] + 1, v[1]]);
                }
                if (v[1] < this.grid.length - 1 && !mines[v[0]][v[1] + 1]) {
                    toVisit.push([v[0], v[1] + 1]);
                }
            }
        }
        return false;
    }

    resetVisited() {
        for (const row of this.grid) {
            for (let i = 0; i < row.length; i ++) {
                row[i] = row[i] & ~2;
            }
        }
        this.visit();
    }

    static deserialize(str: string): MineGrid {
        const result = str.match(/.*\n/g);
        if (!result)
            throw new MalformedGridStringException('The string should have new line characters (\\n).');
        const grid = new MineGrid(result[0].length - 1, result.length);
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length - 1; j++) {
                let cell = parseInt(result[i][j]);
                if (isNaN(cell)) throw new MalformedGridStringException(`Grid cell [${j},${i}] is not a number.`);
                if (cell > 7) throw new MalformedGridStringException('A value of a cell can\'t be greater than 7.');
                if (cell & 4) {
                    cell &= ~4;
                    grid.playerLocation = [j, i]
                }
                grid.grid[i][j] = cell
            }
        }
        return grid
    }

    getGridMines(): boolean[][] {
        const g = [];
        for (const r of this.grid) {
            const arr: boolean[] = [];
            g.push(arr);
            for (let c of r) {
                arr.push(!!(c & 1));
            }
        }
        return g;
    }

    moveRight(): number[] {
        if (this.playerLocation[0] < this.grid[0].length - 1) {
            this.playerLocation[0] = this.playerLocation[0] + 1;
            this.visit();
        }
        return this.playerLocation;
    }

    moveLeft(): number[] {
        if (this.playerLocation[0] > 0) {
            this.playerLocation[0] = this.playerLocation[0] - 1;
            this.visit();
        }
        return this.playerLocation;
    }

    moveUp(): number[] {
        if (this.playerLocation[1] > 0) {
            this.playerLocation[1] = this.playerLocation[1] - 1;
            this.visit();
        }
        return this.playerLocation;
    }

    moveDown(): number[] {
        if (this.playerLocation[1] < this.grid.length - 1) {
            this.playerLocation[1] = this.playerLocation[1] + 1;
            this.visit();
        }
        return this.playerLocation;
    }

    visit(location?: number[]): void {
        if (!location)
            this.grid[this.playerLocation[1]][this.playerLocation[0]] |= 2;
        else
            this.grid[location[1]][location[0]] |= 2;
    }

    isVisited(location: number[]): boolean {
        return !!(this.grid[location[1]][location[0]] & 2);
    }

    serialize(): string {
        let n = 0;
        let s = '';
        for (const row of this.grid) {
            for (let i = 0; i < row.length; i++) {
                s += row[i] + (this.playerLocation[0] === i && this.playerLocation[1] === n ? 4 : 0)
            }
            s += '\n';
            n ++;
        }
        return s;
    }
}

export class NoPlaceForPlayerAtBottomRowException extends Error{

}

export class MalformedGridStringException extends Error{

}