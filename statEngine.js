class StatEngine{
    constructor() {
        this.statistics = new Array(); 
        this.populationSoFar = new Array();
        this.deadSoFar = new Array();
        this.infectedSoFar = new Array();
    }

    getInfected(generation){
        return this.statistics[generation].populationInfected;
    }

    getPopulation(generation){
        return  this.statistics[generation].population;
    }
    
    getStatistics(){
        return this.statistics;
    }

    getPopulationSoFar(){
        return this.populationSoFar;
    }

    getDeadSoFar(){
        return this.deadSoFar;
    }

    getInfectedSoFar(){
        return this.infectedSoFar;
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

    processStats(data){
        this.statistics.push(data);
        this.deadSoFar.push(data.totalDeaths);
        this.populationSoFar.push(data.population);
        this.infectedSoFar.push(data.populationInfected);
    }
}