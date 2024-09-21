import {test, expect, beforeAll} from '@jest/globals';
import TwoDArrayGenerator from "../TwoDArrayGenerator";

let a: TwoDArrayGenerator;

beforeAll(()=>{
    a = new TwoDArrayGenerator()
});

test("print matrix", () => {
    a.makeConstant().print();
    expect(a.getAt(0,2)).toBe(11)
});

test('find saddle point', () => {
    a.makeConstant().print();
    const result = a.findSaddlePoints();
    expect(result[0]).toStrictEqual([4,0]);
    expect(result[0][1]).toBe(0);
});

test('find maxes at row', () => {
    a.makeConstant();
    expect(a.findMaxesInRow(0)[0]).toBe(4);
});

test('check is min at column', () => {
    a.makeConstant();
    expect(a.checkIsMinAtColumn(0, 0)).toBe(true);
    expect(a.checkIsMinAtColumn(0, 1)).toBe(false);
});

test('random print', () => {
    a.makeRandom().print();
    const result = a.findSaddlePoints();
    console.log(result);
    expect(true).toBe(true);
});
