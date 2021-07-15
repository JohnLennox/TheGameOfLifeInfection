class GraphEngine {

    updateGraph(graph, dataList) {
        console.log(graph)
        console.log(dataList)
        graph.data.labels = this.getNumberedList(dataList);
        graph.data.datasets.forEach((dataset) => {
            dataset.data = (dataList);
        });
        graph.update();
    }

    getNumberedList(dataList) {
        let labelList = new Array();
        for (let i = 0; i < dataList.length; i++) {
            labelList.push(i);
        }
        return labelList;
    }

    drawChart(ctx, dataList) {
        let labelList = this.getNumberedList(dataList);

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelList,
                datasets: [{

                    data: dataList,
                    fill: false,
                    borderColor: 'rgb(75,192,192)',
                    tension: 0
                }]

            }
            ,
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