class Person {
    constructor(x, y, res, board) {
        this.infectionTime = 15;
        this.age = 0;
        this.infected = false;
        this.neighbours = 0;
        this.x = x;
        this.y = y;
        this.res = res;
        this.dead = false;
        this.board = board;
    }

    isInfected() {
        return this.infected;
    }

    drawPerson() {
        stroke(1);
        fill(255);
        if (this.infected) {
            fill(0, 255, 0);
        }
        rect(this.x * this.res, this.y * this.res, this.res, this.res);
    }

    countNeighbours() {
        this.neighbours = this.board.getPersonsNeighbours(this);
    }

    infectedNeighbours() {
        let infectedCount = this.board.getPersonsInfectedNeighbours(this);
        if (infectedCount >= 1) {
            this.infect();
        }
    }

    getNeighbours() {
        this.countNeighbours();
        return this.neighbours;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    increaseAge() {
        this.age++;
    }

    getAge() {
        return this.age;
    }

    die() {
        this.dead = true;
    }

    makeChild(board) {
        if (this.infected) {
            return board;
        }

        let options = this.getEmptyNeighbours();
        let dir = options[floor(random(options.length))];
        if (dir == "RIGHT") {
            this.board.makePerson(this.x + 1, this.y, this.res)
        }
        if (dir == "LEFT") {
            this.board.makePerson(this.x - 1, this.y, this.res);
        }
        if (dir == "UP") {
            this.board.makePerson(this.x, this.y + 1, this.res);
        }
        if (dir == "DOWN") {
            this.board.makePerson(this.x, this.y - 1, this.res);
        }

        return board;
    }

    getEmptyNeighbours() {
        return this.board.getPersonsEmptyNeighbours(this.x, this.y);
    }

    checkInfection() {
        if (this.infected) {
            this.infectionTime--;
            if (this.infectionTime < 1) {
                this.board.killPerson(this.x, this.y, true);
                this.dead = true;
            }
        }
    }

    move() {
        let options = this.getEmptyNeighbours(board);
        let dir = options[floor(random(options.length))];
        this.board.movePerson(this, dir)
    }

    processTurn() {
        this.checkInfection();
        this.move();
    }

    infect() {
        this.infected = true;
    }

}