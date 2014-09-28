require(["jquery", "temp-tables", "temp-graphs", "datatables", "temp-charts"], function($, tempTable, tempGraph, DataTable, tempCharts) {

	tempTable.getEventList('#selectEvent');

	$('#selectEvent').on('change', function(evt) {
		tempCharts.destroyChart();
		var selected = $('#selectEvent option:selected').text();

		$('#historic-s1').empty();
		$('#historic-s1').empty();
		$('#graph').empty();
		
		tempTable.displayEventDetails('#historic-s1', selected, 's1', function(data) {
			tempCharts.showLineChart('#myChart1', data);
		});
		tempTable.displayEventDetails('#historic-s2', selected, 's2', function(data) {
			tempCharts.showLineChart('#myChart2', data);
		});
	});
}); 