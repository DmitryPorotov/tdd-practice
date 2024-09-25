import {it, describe, expect, beforeEach} from '@jest/globals';
import MineGrid, {NoPlaceForPlayerAtBottomRowException} from "../mine-grid";



describe('mine sweeper game', () => {
    it('should be able to instantiate a grid', () => {
        const mineGrid = new MineGrid(8, 8, 0.2);
        expect(mineGrid).toBeDefined();
        const grid = mineGrid.getGridMines();
        for (const r of grid) {
            expect(r.length).toBe(8)
        }
    });
    it('should set mines with specified probability', () => {
        const mineGrid = new MineGrid(8, 8, 0.3);
        mineGrid.initMines();
        let sum = 0;
        const grid = mineGrid.getGridMines();
        for (const row of grid) {
            for (const cell of row) {
                sum += cell ? 1 : 0;
            }
        }
        const prob = sum / 64;
        expect(prob).toBeGreaterThan(.1);
        expect(prob).toBeLessThan(.4);
    });
    it('should set players start location', () => {
        const mineGrid = new MineGrid(8, 8, 0.3);
        mineGrid.initMines();
        try {
            const pos = mineGrid.initPlayer();
            expect(pos[1]).toBe(7);
            expect(pos[0]).toBeGreaterThanOrEqual(0);
            expect(pos[0]).toBeLessThanOrEqual(7);
        } catch (e: unknown) {
            if (e instanceof NoPlaceForPlayerAtBottomRowException)
                expect(e.message).toBe('Bottom row is all mines');
            else
                throw e;
        }
    });
    it('should be able to validate that there is a path from start to finish', () => {
        const mineGrid = new MineGrid(8, 8, 0.2);
        mineGrid.initMines();
        while (true) {
            try {
              mineGrid.initPlayer();
              break;
            }
            catch (e) {
                if (!(e instanceof NoPlaceForPlayerAtBottomRowException)) {
                    throw e;
                }
            }
        }
        expect(mineGrid.validate()).toBeTruthy()
    })
});

describe("mine sweeper movement", () => {
    let mineGrid: MineGrid;
    beforeEach(() => {
        mineGrid = new MineGrid(8, 8, 0.4);
        mineGrid.initMines();
        while (true) {
            try {
                mineGrid.initPlayer();
                break;
            }
            catch (e) {
                if (!(e instanceof NoPlaceForPlayerAtBottomRowException)) {
                    throw e;
                }
            }
        }
    });
    it('should be able to move the player right', () => {
        const playerLoc = mineGrid.getPlayerLocation();
        const newLoc = mineGrid.moveRight();
        if (playerLoc[0] === mineGrid.dimensions[0] - 1) {
            expect(newLoc[0]).toBe(playerLoc[0])
        }
        else {
            expect(newLoc[0]).toBe(playerLoc[0] + 1)
        }
    });
    it('should be able to move the player left', () => {
        const playerLoc = mineGrid.getPlayerLocation();
        const newLoc = mineGrid.moveLeft();
        if (playerLoc[0] === 0) {
            expect(newLoc[0]).toBe(playerLoc[0])
        }
        else {
            expect(newLoc[0]).toBe(playerLoc[0] - 1)
        }
    });
    it('should be able to move the player up', () => {
        const playerLoc = mineGrid.getPlayerLocation();
        const newLoc = mineGrid.moveUp();
        if (playerLoc[1] === 0) {
            expect(newLoc[1]).toBe(playerLoc[1])
        }
        else {
            expect(newLoc[1]).toBe(playerLoc[1] - 1);
        }
    });
    it('should be able to move the player down', () => {
        const playerLoc = mineGrid.getPlayerLocation();
        const newLoc = mineGrid.moveDown();
        if (playerLoc[1] === mineGrid.dimensions[1] - 1) {
            expect(newLoc[1]).toBe(playerLoc[1])
        }
        else {
            expect(newLoc[1]).toBe(playerLoc[1] + 1);
        }
    });
    it('should be able to check a location is visited', () => {
        const playerLoc = mineGrid.getPlayerLocation();
        mineGrid.visit();
        const newLoc = mineGrid.moveUp();
        expect(mineGrid.isVisited(playerLoc)).toBeTruthy();
        expect(mineGrid.isVisited(newLoc)).toBeTruthy();
        expect(mineGrid.isVisited([0,0])).toBeFalsy();
    });
});

describe("mine sweeper serialization", () => {
    it('should be able to serialize the grid to string', () => {
        const mg = new MineGrid();
        mg.initMines();
        while (true) {
            try {
                mg.initPlayer();
                break;
            }
            catch (e) {
                if (!(e instanceof NoPlaceForPlayerAtBottomRowException)) {
                    throw e;
                }
            }
        }
        const str = mg.serialize();
        expect(typeof str).toBe('string');

    });
    it('should be able to deserialize a mine grid from string', () => {
        const str =
            "00100100\n" +
            "00000100\n" +
            "00101001\n" +
            "00000010\n" +
            "01000000\n" +
            "00000000\n" +
            "00000000\n" +
            "04000001\n";
        const mg = MineGrid.deserialize(str);
        expect(mg.getPlayerLocation()).toStrictEqual([1,7]);
        const gridMines = mg.getGridMines();
        expect(gridMines[0][0]).toBeFalsy();
        expect(gridMines[0][2]).toBeTruthy();
        expect(gridMines[2][2]).toBeTruthy();
        expect(gridMines[2][3]).toBeFalsy();

    })
});