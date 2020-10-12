var chartAl;
		function requestDataAl() {
			$.ajax({
				url: "http://www.remotebot.tech/RT/ajax/connectAl.php", 
				success: function(point) {
					var series = chartAl.series[0],
				    shift = series.data.length > 20; 
					chartAl.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataAl, 1000);	
				},
				cache: false
			});
		}
		
		$(document).ready(function() {		
            chartAl = new Highcharts.Chart({
				chart: {
					renderTo: 'containerAl',
					defaultSeriesType: 'spline',
					events: {
						load: requestDataAl
					}
				},
				title: {
					text: 'Altitude'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 20 * 1000
				},
				yAxis: {
                    min: -100,
                    max: 100,
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'Altitude, in m',
						margin: 20
					}
				},
				series: [{
					name: 'Altitude',
					data: []
				}]
			});
		});