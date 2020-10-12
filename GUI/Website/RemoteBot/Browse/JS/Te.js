$(function () {
    $.getJSON('../Browse/Ajax/TeConnect.php', function (data) {
        // create the chart
        $('#containerTe').highcharts('StockChart', {
            title: {
                text: 'Temperature in *C, over time.'
            },

            subtitle: {
                text: 'Using ordinal X axis'
            },

            xAxis: {
                gapGridLineWidth: 0
            
            },

            rangeSelector : {
                buttons : [{
                    type : 'hour',
                    count : 1,
                    text : '1h'
                }, {
                    type : 'day',
                    count : 1,
                    text : '1D'
                }, {
                    type : 'all',
                    count : 1,
                    text : 'All'
                }],
                selected : 1,
                inputEnabled : false
            },

            series : [{
                name : 'Temperature',
                type: 'area',
                data : data,
                gapSize: 5,
                tooltip: {
                    valueDecimals: 2
                },
                fillColor : {
                    linearGradient : {
                        x1: 1,
                        y1: 1,
                        x2: 1,
                        y2: 0
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                threshold: null
            }]
        });
    });
});
