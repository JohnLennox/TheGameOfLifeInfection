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
    graph = initGraph('aliveChart');
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
    displayData();
    updateGraph(graph, statEngine.getPopulationSoFar());

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

function displayData(){
    document.getElementById('alive').innerText = "People alive: " + statEngine.getPopulation(count);
    document.getElementById('infectedPop').innerText = "Population Infected: " + statEngine.getInfected(count);
    document.getElementById('alive').innerText = "People alive: " + statEngine.getPopulation(count);
    document.getElementById('alive').innerText = "People alive: " + statEngine.getPopulation(count);
}

function initGraph(id){
    let ctx = document.getElementById(id);
    let chart =  graphEngine.drawChart(ctx,statEngine.getPopulationSoFar());
    return chart;
}

function updateGraph(graphs, data){
    graphEngine.updateGraph(graphs, data);
}

function statProcessing() {
    statEngine.processStats(board.getStats());
}
