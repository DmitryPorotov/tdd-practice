import MineGrid, {MineException, NoPlaceForPlayerAtBottomRowException, WinException} from "./mine-grid";
import {createInterface} from 'readline/promises';
import {Interface, ReadLineOptions} from 'readline'

class MineSweeperGame {
    private readline?: Interface & ReadLineOptions;
    private isWon = false;
    init() {
        this.readline = createInterface({
            input: process.stdin,
            output: process.stdout
        }) as unknown as Interface & ReadLineOptions;
        this.readline.input.on('keypress', (key, data) => {
            if (data.name === 'q') process.exit();
            if (this.lives <= 0 || this.isWon) return;
            try {
                switch (data.name) {
                    case 'down':
                        this.grid?.moveDown();
                        break;
                    case 'up':
                        this.grid?.moveUp();
                        break;
                    case 'left':
                        this.grid?.moveLeft();
                        break;
                    case 'right':
                        this.grid?.moveRight();
                        break;
                }
            } catch (e) {
                if (e instanceof MineException) {
                    this.lives --;
                } else if (e instanceof WinException) {
                    this.isWon = true;
                } else throw e;
            }
            this.refreshScreen();
        });
        return this.readline;
    }

    private lives: number = 5;
    private grid?: MineGrid;

    createGame(width:number, height: number, mineProbability: number) {
        this.grid = new MineGrid(width, height, mineProbability);
        while (true) try {
            this.grid.initMines();
            this.grid.initPlayer();
            if (this.grid.validate()) break;
        }
        catch (e) {
            if (!(e instanceof NoPlaceForPlayerAtBottomRowException)) {
                throw e;
            }
        }
        this.grid.resetVisited();
        this.lives = 5;
    }

    refreshScreen() {
        process.stdout.write('\x1Bc');
        console.log(this.grid?.toString());
        console.log(`Lives ${this.lives}`);
        if (this.lives <= 0) {
            console.log('Game Over')
        } else if (this.isWon) {
            console.log('You Win!')
        }
    }
}

const game = new MineSweeperGame();

game.createGame(16,16,.3);
game.init();
console.log('Staring Mine Sweeper game.');
game.refreshScreen();