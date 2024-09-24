import {it, describe, expect, beforeAll} from '@jest/globals';
import MineGrid from "../mine-grid";



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
            if (e instanceof Error)
                expect(e.message).toBe('Bottom row is all mines');
            else
                throw e;
        }
    });
});
