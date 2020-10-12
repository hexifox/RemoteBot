$(function () {
    $.getJSON('../Browse/Ajax/SPConnect.php', function (data) {
        // create the chart
        $('#container').highcharts('StockChart', {
            title: {
                text: 'Sea_Level_Pressure in Pa, over time.'
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
                name : 'Sea_Level_Pressure',
                type: 'area',
                data : data,
                gapSize: 5,
                tooltip: {
                    valueDecimals: 2
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
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
