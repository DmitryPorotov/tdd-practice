export class InvalidRomanNumberException extends Error {

}

type digitOrders = 'ones' | 'tens' | 'hundreds' | 'thousand'

export default class ReverseRoman {
    private digitMapGroups: {[key in digitOrders]: {[k: string]: number}} = {
        ones: {
            I: 1,
            V: 5,
        },
        tens: {
            X: 10,
            L: 50,
        },
        hundreds: {
            C: 100,
            D: 500,
        },
        thousand: {
            M: 1000,
        }
    };
    private digitMap: {[key: string]: number} = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };
    getAllRomanDigits(): string {
        return 'IVXLCDM'
    }

    toDecimal(romanNum: string): number {
        this.validate(romanNum);
        let totalSum = 0;
        for (let i = 0; i < romanNum.length; i ++) {
            let currentNum = this.digitMap[romanNum[i]];
            if (null != romanNum[i+1] && this.digitMap[romanNum[i]] < this.digitMap[romanNum[i+1]]) {
                currentNum *= -1
            }
            totalSum += currentNum;
        }
        return totalSum;
    }

    /**
     * @param romanNum
     * @throws InvalidRomanNumberException
     */
    private validate(romanNum: string): void {
        for (let i = 0; i < romanNum.length; i ++) {
            if (!this.getAllRomanDigits().includes(romanNum[i])) {
                throw new InvalidRomanNumberException(`Unknown roman digit '${romanNum[i]}'`);
            }
            if (i > 0) {
                if (
                    (romanNum[i] in this.digitMapGroups.hundreds && romanNum[i - 1] in this.digitMapGroups.ones)
                    || (romanNum[i] in this.digitMapGroups.thousand && (romanNum[i - 1] in this.digitMapGroups.ones || romanNum[i - 1] in this.digitMapGroups.tens))
                ) {
                    throw new InvalidRomanNumberException();
                }
            }
        }
    }
}