class GraphEngine {

    constructor() {
        this.numberedList = new Array();
    }

    processData(stats) {
        let dataList = new Array();
        for (let i = 0; i < stats.length; i++) {
            let label = stats[i].label;
            let data = stats[i].data;
            let colour = stats[i].colour;
            dataList[i] = this.makeDataSet(label, data, colour);
        }
        return dataList;
    }

    update(graph, stats) {
        let dataList = this.processData(stats);
        this.updateNumberedList();
        graph.data.labels = this.getNumberedList();

        for (let i = 0; i < graph.data.datasets.length; i++) {
            graph.data.datasets[i] = dataList[i];
        }

        graph.update();
    }

    updateNumberedList() {
        this.numberedList.push((this.numberedList.length + 1));
    }

    getNumberedList() {
        return this.numberedList;
    }

    makeDataSet(labelText, dataList, colour) {
        return {
            label: labelText,
            data: dataList,
            fill: false,
            borderColor: colour,
            tension: 0
        }
    }

    makeDataSets(dataObjects) {
        let datasets = new Array();
        for (let dataObject of dataObjects) {
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