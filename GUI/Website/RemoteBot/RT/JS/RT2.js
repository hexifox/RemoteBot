var chartLu;
var chartHu; 
		function requestDataPr() {
			$.ajax({
				url: '../RT/ajax/connectPr.php', 
				success: function(point) {
					var series = chartPr.series[0],
				    shift = series.data.length > 20; 
					chartPr.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataPr, 1000);	
				},
				cache: false
			});
		}
        function requestDataSP() {
			$.ajax({
				url: '../RT/ajax/connectSP.php', 
				success: function(point) {
					var series = chartSP.series[0],
				    shift = series.data.length > 20; 
					chartSP.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataSP, 1000);	
				},
				cache: false
			});
		}
        function requestDataAl() {
			$.ajax({
				url: '../RT/ajax/connectAl.php', 
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