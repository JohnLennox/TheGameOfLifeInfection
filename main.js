let board;
let people = [];
let ageLimit = 50;
let statEngine;

function setup() {
    let canvas = createCanvas(700, 700);
    canvas.parent('canvasContainer');
    canvas.id('mycanvas');
    // frameRate(10);

    let gridLength = 100
    
    board = new Board(gridLength);
}

function draw() {
    background(0);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board.getPosition(i, j) != undefined) {
                let person = board.getPosition(i, j);
                person.drawPerson();
            }
        }
    }
    gameLogic();
    statProcessing();
}

function gameLogic() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board.getPosition(i, j) != undefined) {
                let person = board.getPosition(i, j);

                // TODO : extract below into the person.processTurn method
                if (person.getNeighbours() < 1 || person.getNeighbours() > 3 || person.getAge() > ageLimit) {
                    person.die();
                    board.killPerson(i, j, false);
                } else if (person.getNeighbours() == 2) {
                    person.makeChild();
                    person.processTurn()
                } else {
                    person.processTurn();
                    person.infectedNeighbours();
                    person.increaseAge();
                }
            }
        }
    }
}

function statProcessing() {
    // statEngine.increaseTurn();
    // statEngine
}
