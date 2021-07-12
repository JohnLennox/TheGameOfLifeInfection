class Board {
    constructor(gridLength) {
        this.board = this.make2dArray(gridLength);
        this.length = gridLength;
        this.roundDeaths = 0;
        this.infectedDeaths = 0;

        for (let i = 0; i < gridLength; i++) {
            for (let j = 0; j < gridLength; j++) {
                let create = floor(random(5));
                if (create == 1) {
                    let person = new Person(i, j, width / gridLength, this);
                    if (floor(random(200)) == 8) {
                        person.infect();
                    }
                    this.board[i][j] = person;
                }
            }
        }
    }

    make2dArray(gridLength) {
        let twodArray = Array(gridLength);
        for (let i = 0; i < gridLength; i++) {
            twodArray[i] = new Array(gridLength);
        }
        return twodArray;
    }

    makePerson(x, y, res) {
        let person = new Person(x, y, res, this);
        this.board[x][y] = person;
    }

    getPersonsInfectedNeighbours(person) {
        let infectedCount = 0;
        let y = person.getY();
        let x = person.getX();

        if(person.isInfected()){
            return infectedCount;
        }

        for (let i = x - 1; i <= x + 1; i++) {
            if (i >= 0 && i < board.length) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (j >= 0 && j < this.length) {
                        if (this.board[i][j] != undefined ) {
                            if (this.board[i][j].isInfected()) {
                                infectedCount++;
                            }
                        }
                    }
                }
            }
        }

        return infectedCount;
    }

    getPersonsNeighbours(person) {
        let x = person.getX();
        let y = person.getY();
        let count = -1;
        for (let i = x - 1; i <= x + 1; i++) {
            if (i >= 0 && i < this.length) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (j >= 0 && j < this.length) {
                        if (this.board[i][j] != undefined) {
                            count++;
                        }
                    }
                }
            }
        }
        return count;
    }

    getPersonsEmptyNeighbours(x, y) {
        let options = new Array();
        if (x > 0) {
            if (this.board[x - 1][y] == undefined) {
                options.push("LEFT")
            }
        }
        if (y > 0) {
            if (this.board[x][y - 1] == undefined) {
                options.push("DOWN")
            }
        }
        if (x < this.board.length - 1) {
            if (this.board[x + 1][y] == undefined) {
                options.push("RIGHT")
            }
        }
        if (y < this.board.length - 1) {
            if (this.board[x][y + 1] == undefined) {
                options.push("UP")
            }
        }
        return options;
    }

    movePerson(person, dir) {
        let curX = person.getX();
        let curY = person.getY();
        this.board[curX][curY] = undefined;
        if (dir == "RIGHT") {
            person.setX(curX + 1)
        }
        if (dir == "LEFT") {
            person.setX(curX - 1)
        }
        if (dir == "UP") {
            person.setY(curY + 1)
        }

        if (dir == "DOWN") {
            person.setY(curY - 1)
        }

        this.board[person.getX()][person.getY()] = person;
    }

    getNumberOfPeople() {
        let numberOfPeople = 0;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] != undefined) {
                    numberOfPeople++;
                }
            }
        }
        return numberOfPeople;
    }

    getNumberOfInfected() {
        let infected = 0;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] != undefined && this.board[i][j].isInfected()) {
                    infected++
                }
            }
        }
        return infected;
    }

    getPosition(i, j) {
        return this.board[i][j];
    }

    killPerson(i, j, infection) {
        if (infection) {
            this.infectedDeaths ++;
        } 
        this.roundDeaths ++;

        this.board[i][j] = undefined;
    }

    resetStats(){
        this.infectedDeaths = 0;
        this.roundDeaths = 0;
    }


    getStats() {
        let infectedDeaths = this.infectedDeaths;
        let totalDeaths = this.roundDeaths;
        let population = this.getNumberOfPeople();
        let populationInfected = this.getNumberOfInfected();
        this.resetStats();
        return new DataObject(infectedDeaths, totalDeaths, population, populationInfected);
    }
}