import {expect, beforeEach, describe, it} from '@jest/globals';
import AlignColumns, {text} from "../align-columns";



describe('align paragraph into columns', () => {
    it('should be able to count words in each line', () =>{
        const ac = new AlignColumns(text);
        const result = ac.splitIntoWords();
        expect(result).toStrictEqual([12,10,12,8]);
    });
    it('should calc a column string', () => {
        const txt =
`Given$a$text
are$delineated$`;
        const ac = new AlignColumns(txt);
        ac.splitIntoWords();
        const out = ac.toAlignedString();
        expect(out).toBe(
`Given a          text 
are   delineated `
        );
    });
    it('should calc a column string full', () => {

        const ac = new AlignColumns(text);
        ac.splitIntoWords();
        const out = ac.toAlignedString();
        expect(true).toBeTruthy();
        console.log(out)
    })
});