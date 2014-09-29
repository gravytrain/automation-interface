define(["jquery", "configuration", "datatables", "moment"], function($, config, DataTable, moment) {

	var _host = window.location.host;
	var _oWebService = config.webServiceSettings[_host];
	var _oClientSettings = config.clientSettings['default'];

	var getEventList = function(selector) {
		$.ajax({
			url : _oWebService.MongoPimometer,
			dataType : 'jsonp',
			jsonp : 'jsonp',
			timeout : _oClientSettings.RequestTimeout,
			success : function(json) {
				$.each(json.rows, function(index, row) {
					if (row['_id'] != 'client_config') {
						$(selector).append($('<option></option>').attr('value', row['_id']).text(row['_id']));
					}
				});
			}
		});

	};

	var displayEventDetails = function(selector, event, sensor, callback) {

		var config;
		var sensorCount = _oClientSettings.NumberSensors;
		var sensor;
		var temp;
		var obj = new Object();

		$(selector).closest(".box").children(".box-header").children("h2").html(event + " Historical Temperatures ");

		if ($.fn.dataTable.isDataTable(selector)) {
			$(selector).DataTable().destroy();
		}

		var table = $(selector).DataTable({
			"ajax" : {
				"url" : _oWebService.MongoPimometer,
				"dataType" : "jsonp",
				"jsonp" : 'jsonp',
				"timeout" : _oClientSettings.RequestTimeout,
				"dataSrc" : function(json) {
					console.log(json);
					var newArray = [];
					$.each(json.rows, function(index, row) {
						if (row['_id'] == event) {
							$.each(row["s1"], function(index, element) {
								temp = new Object();
								temp["timestamp"] = Object.keys(element)[0];
								temp["s1"] = element[Object.keys(element)[0]];
								s2obj = row["s2"][index];
								if (Object.keys(s2obj)[0] == temp["timestamp"]) {
									temp["s2"] = s2obj[Object.keys(s2obj)[0]];
								} else {
									temp["s2"] = "";
								}

								newArray.push(temp);
							});
						}
						if (row['_id'] == 'client_config') {
							config = row;
						}
					});
					if (callback !== undefined) {
						callback(newArray);
					}
					return newArray;
				}
			},
			"columnDefs" : [{
				"targets" : 0,
				"data" : "timestamp",
				"title" : "TimeStamp",
				"render" : function(data) {
					var setTimeFormat = localStorage['time-format'];
					if (setTimeFormat != undefined) {
						useTime = setTimeFormat;
					} else {
						useTime = localStorage['defaultTimeFormat'];
					}
					return moment(data).format(useTime);
				}
			}, {
				"targets" : 1,
				"data" : "s1",
				"title" : "Sensor 1",
			}, {
				"targets" : 2,
				"data" : "s2",
				"title" : "Sensor 2",
			}],
			"dom" : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
			"pagingType" : "bootstrap",
			"paging" : true,
			"searching" : true,
			"autoWidth" : false,
			"retrieve" : true,
			"info" : true,
			"language" : {
				"emptyTable" : "Historical Temperatures not yet available.",
			}
		});
	};

	return {
		getEventList : getEventList,
		displayEventDetails : displayEventDetails,

	};

});
