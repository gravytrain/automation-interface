require(["jquery", "temp-tables", "temp-graphs", "datatables", "temp-charts", "events", "yocto-api", "yocto-temp"], function($, tempTable, tempGraph, DataTable, tempCharts, Events) {

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

//		tempTable.displayEventDetails('#historic-s1', selected, 's1', function(data) {
//			tempCharts.showLineChart('#myChart1', data);
//		});
//		tempTable.displayEventDetails('#historic-s2', selected, 's2', function(data) {
//			tempCharts.showLineChart('#myChart2', data);
//		});
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
			$('#s1-sensor').html(temp1.get_currentValue());
			$('#s2-sensor').html(temp2.get_currentValue());
		} else {
			$('#s1-sensor').html('DCed');
			$('#s2-sensor').html('DCed');
		}
		setTimeout('refresh()', 5000);
	}

});
