class StatEngine{
    constructor(givenBoard) {
        let board = givenBoard;
        let statistics = new Array(); 
        let data = new DataObject();
    }

    newGeneration(){
        this.data = new DataObject();
        this.statistics.push(data);
    }

    getInfected(generation){
        return this.statistics.get(generation).populationInfected;
    }

    getPopulation(generation){
        return  this.statistics.get(generation).population;
    }

    getDead(generation){
        return this.statistics.get(generation).totalDeaths;
    }

    getNotInfected(generation){
        return this.statistics.get(generation).populationInfected;
    }

    getNaturalDeaths(generation){
        return this.statistics.get(generation).totalDeaths - this.infectedDeaths;
    }

    gatherStatistics(){
        board.
    }
    
    processInfectedDeath(){
        this.data.infectedDeaths++;
        this.data.totalDeaths++;
    }

    processNaturalDeath(){
        this.data.totalDeaths++;
    }
    
}