let board;
let people = [];
let ageLimit = 50;
let statEngine;
let count;
let graphEngine;
let graph;

function setup() {
    count =0;
    let canvas = createCanvas(700, 700);
    canvas.parent('canvasContainer');
    canvas.id('mycanvas');

    graphEngine = new GraphEngine();
    let gridLength = 100;
    
    board = new Board(gridLength);
    statEngine = new StatEngine(board);
    graph = initGraph('chart');
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

    if(count%10 == 0){
        statProcessing();
        updateGraph(graph);
    }
    
    board.newRound();
    count ++;
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

function initGraph(id){
    let ctx = document.getElementById(id);
    
    let population = {
        label: "Population",
        data: statEngine.getPopulationSoFar(),
        colour: "rgb(0,200,0)"
    }

    let dead = {
        label: "Dead",
        data: statEngine.getDeadSoFar(),
        colour: "rgb(200,0,0)"
    }
    let infected = {
        label: "Infected",
        data: statEngine.getInfectedSoFar(),
        colour: "rgb(0,0,200)"
    }

    let data = new Array();
    data.push(population);
    data.push(dead);
    data.push(infected);
    let chart =  graphEngine.drawChart(ctx,data);
    return chart;
}

function updateGraph(graphs){

    let population = {
        label: "Population",
        data: statEngine.getPopulationSoFar(),
        colour: "rgb(0,200,0)"
    }

    let dead = {
        label: "Dead",
        data: statEngine.getDeadSoFar(),
        colour: "rgb(200,0,0)"
    }

    let infected = {
        label: "Infected",
        data: statEngine.getInfectedSoFar(),
        colour: "rgb(0,0,200)"
    }

    let data = {
        population: population,
        dead: dead,
        infected: infected
    }

    graphEngine.update(graphs, data);
}

function statProcessing() {
    statEngine.processStats(board.getStats());
}
