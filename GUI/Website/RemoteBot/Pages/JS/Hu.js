var chart; 
		function requestData() {
			$.ajax({
				url: '../ajax/connectHu.php', 
				success: function(point) {
					var series = chart.series[0],
				    shift = series.data.length > 20; 
					chart.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestData, 1000);	
				},
				cache: false
			});
		}
		$(document).ready(function() {
			chart = new Highcharts.Chart({
				chart: {
					renderTo: 'containerHu',
					defaultSeriesType: 'spline',
					events: {
						load: requestData
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