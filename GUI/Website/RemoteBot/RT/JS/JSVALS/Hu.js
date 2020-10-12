var chartHu;
		function requestDataHu() {
			$.ajax({
				url: "http://www.remotebot.tech/RT/ajax/connectHu.php", 
				success: function(point) {
					var series = chartHu.series[0],
				    shift = series.data.length > 20; 
					chartHu.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataHu, 1000);	
				},
				cache: false
			});
		}
		
		$(document).ready(function() {		
            chartHu = new Highcharts.Chart({
				chart: {
					renderTo: 'containerHu',
					defaultSeriesType: 'spline',
					events: {
						load: requestDataHu
					}
				},
				title: {
					text: 'Humidity'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 20 * 1000
				},
				yAxis: {
                    min: 0,
                    max: 100,
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'Humidity, in %',
						margin: 20
					}
				},
				series: [{
					name: 'Humidity',
					data: []
				}]
			});	
		});