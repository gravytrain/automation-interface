require(["jquery", "temp-tables", "temp-graphs", "datatables", "temp-charts", "events", "temp-current"], function($, tempTable, tempGraph, DataTable, tempCharts, Events, tempCurr) {

	tempTable.getEventList('#select-event');

	$('#add-event').on('click', function() {
		Events.eventBuilder();
	});

	$('#select-event').on('click', function(evt) {
		tempCharts.destroyChart();
		var selected = evt.target.innerHTML;

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

	if (yRegisterHub('http://127.0.0.1:4444/') != YAPI_SUCCESS) {
		alert("Cannot contact VirtualHub on 127.0.0.1");
	} else {
		refresh();
	}

	function refresh() {
		var temp, serial = document.getElementById('serial').value;

		if (serial == '') {
			// or use any conected module suitable for the demo
			temp = yFirstTemperature();
			if (temp) {
				serial = temp.module().get_serialNumber();
				document.getElementById('serial').value = serial;
			}
		}

		temp1 = yFindTemperature(serial + ".temperature1");
		temp2 = yFindTemperature(serial + ".temperature2");

		if (temp1.isOnline()) {
			var s1 = toFahrenheit(temp1.get_currentValue(), 4);
			var s2 = toFahrenheit(temp2.get_currentValue(), 4);
			
			$('#s1-current').append(s1);
			$('#s2-current').append(s2);
		} else {
			$('#s1-current').append('DCed');
			$('#s2-current').append('DCed');
		}
		setTimeout('refresh()', 5000);
	}

});
