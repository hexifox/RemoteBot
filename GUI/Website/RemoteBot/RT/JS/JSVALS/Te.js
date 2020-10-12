var chartTe;
		function requestDataTe() {
			$.ajax({
				url: 'http://www.remotebot.tech/RT/ajax/connectTe.php', 
				success: function(point) {
					var series = chartTe.series[0],
				    shift = series.data.length > 20; 
					chartTe.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataTe, 1000);	
				},
				cache: false
			});
		}
		$(document).ready(function() {	
            chartTe = new Highcharts.Chart({
				chart: {
					renderTo: 'containerTe',
					defaultSeriesType: 'spline',
					events: {
						load: requestDataTe
					}
				},
				title: {
					text: 'Temperature'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 20 * 1000
				},
				yAxis: {
                    min: 0,
                    max: 40,
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'Temperature, in *C',
						margin: 20
					}
				},
				series: [{
					name: 'Temperature',
					data: []
				}]
			});
         });