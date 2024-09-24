export default class MineGrid {
    private grid: Array<Uint8Array> = [];
    private playerLocation: number[] = [-1, -1];
    constructor(width: number, heights: number, private mineProbability = 0.2) {
        if (mineProbability >= 1) {
            throw new Error('Mine probability can\'t be 1.');
        }
        for (let i = 0; i < heights; i ++) {
            this.grid.push(new Uint8Array(8));
        }
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
            throw new Error('Bottom row is all mines');
        }
        const pos = Math.floor(Math.random() * possibleStartPoints.length);
        this.playerLocation = [pos, this.grid.length - 1];
        return this.playerLocation;
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
}