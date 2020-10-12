var chartRD;
		function requestDataRD() {
			$.ajax({
				url: 'http://www.remotebot.tech/RT/ajax/connectRD.php', 
				success: function(point) {
					var series = chartRD.series[0],
				    shift = series.data.length > 20; 
					chartRD.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataRD, 1000);	
				},
				cache: false
			});
		}
		
		$(document).ready(function() {		
            chartRD = new Highcharts.Chart({
				chart: {
					renderTo: 'containerRD',
					defaultSeriesType: 'spline',
					events: {
						load: requestDataRD
					}
				},
				title: {
					text: 'Rain Drops'
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
						text: 'Rain Drops, in %',
						margin: 20
					}
				},
				series: [{
					name: 'Rain Drops',
					data: []
				}]
			});
		});