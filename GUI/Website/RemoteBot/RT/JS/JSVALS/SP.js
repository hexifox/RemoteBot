var chartSP;
		function requestDataSP() {
			$.ajax({
				url: 'http://www.remotebot.tech/RT/ajax/connectSP.php', 
				success: function(point) {
					var series = chartSP.series[0],
				    shift = series.data.length > 20; 
					chartSP.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataSP, 1000);	
				},
				cache: false
			});
		}
		
		$(document).ready(function() {		
            chartSP = new Highcharts.Chart({
				chart: {
					renderTo: 'containerSP',
					defaultSeriesType: 'spline',
					events: {
						load: requestDataSP
					}
				},
				title: {
					text: 'Sea-Level Pressure'
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
						text: 'Sea-Level Pressure, in Pa',
						margin: 20
					}
				},
				series: [{
					name: 'Sea-Level Pressure',
					data: []
				}]
			});
		});