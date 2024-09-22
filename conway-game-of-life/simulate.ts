import GameOfLifeGrid from "./GameOfLifeGrid";
import {setInterval} from 'node:timers'

const start =
`o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o
o-o-o--oo-o-o--o`;

const glider =
`--o-------------
o-o-------------
-oo-------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------`;

const startGrid = GameOfLifeGrid.fromString(glider);
const str = startGrid.toString();
console.log(str);
let newGrid = startGrid.calculateNext();
setInterval(()=>{
    const newStr = newGrid.toString();
    // @ts-ignore
    process.stdout.write('\x1Bc');
    console.log(newStr);
    newGrid = newGrid.calculateNext();
}, 1000);