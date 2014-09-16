require(["jquery", "temp-tables", "temp-graphs", "datatables"], function($, tempTable, tempGraph, DataTable) {

	tempTable.getEventList('#selectEvent');

	$('#selectEvent').on('change', function(evt) {
		var selected = $('#selectEvent option:selected').text();

		$('#historic-s1').empty();
		$('#historic-s1').empty();
		$('#graph').empty();
		
		tempTable.displayEventDetails('#historic-s1', selected, 's1', function(data) {
			console.log(JSON.stringify(data));
			tempGraph.showLineGraph('#graph', data);
		});
		tempTable.displayEventDetails('#historic-s2', selected, 's2');
	});
}); 