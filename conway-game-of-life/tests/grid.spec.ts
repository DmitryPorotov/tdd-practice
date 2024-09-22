import {expect, beforeEach, describe, it} from '@jest/globals';
import GameOfLifeGrid from "../GameOfLifeGrid";
import {IndexOutOfBoundsException} from "../exceptions";

describe('test for game of life grid', () => {
    let g: GameOfLifeGrid | null = null;
    beforeEach(()=>{
        g = new GameOfLifeGrid(80, 80);
    });
    it('should create a grid of 10x10 byte (80x80 bit)', () => {
        expect(g).toBeDefined();
    });
    it('should throw an exception when trying to get index out of bounds of the grid', () => {
        // @ts-ignore
        expect(() => {g.getAt(-1,-1)}).toThrowError(IndexOutOfBoundsException)
    });
    const str =
`o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o`;
    it('should be able to read a grid from a string', () => {
        const grid = GameOfLifeGrid.fromString(str);
        const str2 = grid.toString();
        console.log(str2);
        expect(grid.getAt(4, 1)).toBeTruthy();
        expect(grid.getAt(5, 1)).toBeFalsy();
    });
    it('should be able to sum neighbours', ()=>{
        const grid = GameOfLifeGrid.fromString(str);
        expect(grid.sumNeighbours(0,0)).toBe(1);
        expect(grid.sumNeighbours(1,1)).toBe(6);
        expect(grid.sumNeighbours(2,1)).toBe(2);
    });
    it('should be able to calculate next iteration', () => {
        const grid = GameOfLifeGrid.fromString(str);
        const grid2 = grid.calculateNext();
        const str2 = grid2.toString();
        console.log(str2)
    })
});