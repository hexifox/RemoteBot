var chartLu;
		function requestDataLu() {
			$.ajax({
				url: "http://www.remotebot.tech/RT/ajax/connectLu.php", 
				success: function(point) {
					var series = chartLu.series[0],
				    shift = series.data.length > 20; 
					chartLu.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataLu, 1000);	
				},
				cache: false
			});
		}
		
		$(document).ready(function() {		
            chartLu = new Highcharts.Chart({
				chart: {
					renderTo: 'containerLu',
					defaultSeriesType: 'spline',
					events: {
						load: requestDataLu
					}
				},
				title: {
					text: 'Luminosity'
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
						text: 'Luminosity, in %',
						margin: 20
					}
				},
				series: [{
					name: 'Luminosity',
					data: []
				}]
			});
		});