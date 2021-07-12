class StatEngine{
    constructor() {
        this.statistics = new Array(); 
    }

    getInfected(generation){
        return this.statistics[generation].populationInfected;
    }

    getPopulation(generation){
        return  this.statistics[generation].population;
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
    }
}