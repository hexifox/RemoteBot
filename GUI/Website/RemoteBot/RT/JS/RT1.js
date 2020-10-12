var chartLu;
var chartHu;
var chartRD;
var chartTe;
		function requestDataHu() {
			$.ajax({
				url: '../RT/ajax/connectHu.php', 
				success: function(point) {
					var series = chartHu.series[0],
				    shift = series.data.length > 20; 
					chartHu.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataHu, 1000);	
				},
				cache: false
			});
		}
        function requestDataLu() {
			$.ajax({
				url: '../RT/ajax/connectLu.php', 
				success: function(point) {
					var series = chartLu.series[0],
				    shift = series.data.length > 20; 
					chartLu.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataLu, 1000);	
				},
				cache: false
			});
		}
        function requestDataTe() {
			$.ajax({
				url: '../RT/ajax/connectTe.php', 
				success: function(point) {
					var series = chartTe.series[0],
				    shift = series.data.length > 20; 
					chartTe.series[0].addPoint(eval(point), true, shift);
					setTimeout(requestDataTe, 1000);	
				},
				cache: false
			});
		}
        function requestDataRD() {
			$.ajax({
				url: '../RT/ajax/connectRD.php', 
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