class GraphEngine {

    constructor(){
        this.numberedList = new Array();
    }

    update(graph, stats){
        let dataList = new Array();
        dataList[0] = (this.makeDataSet(stats.population.label, stats.population.data, stats.population.colour));
        dataList[1] = (this.makeDataSet(stats.dead.label, stats.dead.data, stats.dead.colour));
        dataList[2] = (this.makeDataSet(stats.infected.label, stats.infected.data, stats.infected.colour));

        this.updateNumberedList();
        graph.data.labels = this.getNumberedList();

        for(let i=0; i<graph.data.datasets.length; i++){
            graph.data.datasets[i] = dataList[i];
        }
        
        graph.update();
    }

    updateNumberedList(){
        this.numberedList.push((this.numberedList.length+1));
    }

    getNumberedList() {
        return this.numberedList;
    }

    makeDataSet(labelText, dataList, colour){
        return {
            label: labelText,
            data: dataList,
            fill: false,
            borderColor: colour,
            tension: 0
        }
    }

    makeDataSets(dataObjects){
        let datasets = new Array();
        for(let i =0; i<dataObjects.length; i++){
            let dataObject = dataObjects[i];
            let data = this.makeDataSet(dataObject.label, dataObject.data, dataObject.colour);
            datasets.push(data);
        }
        return datasets;
    }

    drawChart(ctx, dataList) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                datasets: this.makeDataSets(dataList)
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 0
                },
                responsive: false,
                maintainAspectRatio: false
            }

        })
    }

}