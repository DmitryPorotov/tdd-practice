import {test, expect, beforeAll} from '@jest/globals';
import TwoDArrayGenerator from "../TwoDArrayGenerator";

let a: TwoDArrayGenerator;

beforeAll(()=>{
    a = new TwoDArrayGenerator(5, 0,100)
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

test('const print', () => {
    a.makeConstant().print();
    const result = a.findSaddlePoints();
    console.log(result);
    expect(result[0]).toStrictEqual([4, 0]);
});

test('random print', () => {
    a.makeRandom().print();
    const result = a.findSaddlePoints();
    console.log(result);
    // expect(result[0]).toStrictEqual([4, 0]);
});

test('from string', ()=>{
    a.fromString(
`4\t6\t1\t5\t4
    9\t7\t4\t4\t7
    0\t6\t6\t3\t7
    7\t1\t5\t7\t6
    4\t1\t9\t7\t1`);

    const result = a.findSaddlePoints();
    console.log(result);
});

test('from string2', ()=>{
    a.fromString(
`6\t4\t7\t1\t6
    7\t3\t4\t5\t3
    5\t5\t2\t3\t3
    7\t4\t7\t6\t4
    9\t6\t2\t0\t1`);

    const result = a.findSaddlePoints();
    console.log(result);
    expect(result[0]).toStrictEqual([0, 2]);
});

