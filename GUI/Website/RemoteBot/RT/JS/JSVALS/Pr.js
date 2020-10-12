var chartPr;
		function requestDataPr() {
			$.ajax({
				url: "http://www.remotebot.tech/RT/ajax/connectPr.php", 
				success: function(point) {
					var series = chartPr.series[0],
				    shift = series.data.length > 20; 
					chartPr.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataPr, 1000);	
				},
				cache: false
			});
		}
		
		$(document).ready(function() {		
           chartPr = new Highcharts.Chart({
				chart: {
					renderTo: 'containerPr',
					defaultSeriesType: 'spline',
					events: {
						load: requestDataPr
					}
				},
				title: {
					text: 'Atmospheric Pressure'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 20 * 1000
				},
				yAxis: {
                    min: 90000,
                    max: 110000,
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'Atmospheric Pressure, in Pa',
						margin: 20
					}
				},
				series: [{
					name: 'Atmospheric Pressure',
					data: []
				}]
			});
		});