import {it, describe, expect, beforeAll} from '@jest/globals';
import ReverseRoman from "../reverse-roman";


describe('Reverse roman numbers should be able to print decimal numbers given roman numbers', ()=>{
    let revRom: ReverseRoman;
    beforeAll(()=>{
        revRom = new ReverseRoman();
    });
    it('should be able to list all possible roman digits', () => {
        expect(revRom.getAllRomanDigits()).toBe('IVXLCDM');
    });
    it('should thrown an exception when roman number is illegal', () => {
        expect(() => revRom.toDecimal('IM')).toThrow();
        expect(() => revRom.toDecimal('IC')).toThrow();
    });
    it('should not thrown an exception when roman number is legal', () => {
        expect(revRom.toDecimal('I')).toBeTruthy();
        expect(revRom.toDecimal('IV')).toBeTruthy();
        expect(revRom.toDecimal('XL')).toBeTruthy();
        expect(revRom.toDecimal('XC')).toBeTruthy();
        expect(revRom.toDecimal('DCCC')).toBeTruthy();
        expect(revRom.toDecimal('MMMM')).toBeTruthy();
    });
    it('should be able to parse the roman number', () => {
        expect(revRom.toDecimal('DCCC')).toBe(800);
        expect(revRom.toDecimal('CM')).toBe(900);
        expect(revRom.toDecimal('VIII')).toBe(8);
        expect(revRom.toDecimal('IX')).toBe(9);
        expect(revRom.toDecimal('MCMXC')).toBe(1990);
    });
});