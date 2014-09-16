define([ "jquery", "configuration", "datatables" ], function($, config, DataTable) {
  
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
		  console.log(json);
		  $.each(json.rows, function(index, row) {
		    if( row['_id'] != 'client_config' ) {
		      $(selector).append($('<option></option>').attr('value', row['_id']).text(row['_id']));
		    }
		  });
		}
		});
	  
	};
  
	var displayEventDetails = function(selector, event, sensor, callback) {
	  
	  var config;
	  $(selector).closest(".box").children(".box-header").children("h2").html( event + " Historical Temperatures : " + sensor );
	  
	  if ( $.fn.dataTable.isDataTable( selector ) ) {
	    $(selector).DataTable().destroy();
	  }
	  
		var table = $(selector).DataTable({
		  "ajax" : {
		  	"url" : _oWebService.MongoPimometer,
			"dataType" : "jsonp",
			"jsonp" : 'jsonp',
			"timeout" : _oClientSettings.RequestTimeout,
			"dataSrc" : function( json ) {
			  
			  var newArray = [];
			  $.each(json.rows, function(index, row) {
			    if( row['_id'] == event ) {
			      $.each(row[sensor], function(index, element) {
				    var temp = new Object();
				    temp["timestamp"] = Object.keys(element)[0];
				    temp["temperature"] = element[Object.keys(element)[0]];
				    newArray.push(temp);
			      });
			    }
			    if( row['_id'] == 'client_config' ) {
			      config = row;
			    }  
			  });
			  if( callback !== undefined) {
			  callback(newArray);
			  }
			  return newArray;
			}
		  },
		  "columnDefs" : [ {
				"targets" : 0,
				"data" : "timestamp",
				"title" : "TimeStamp",
			}, {
				"targets" : 1,
				"data" : "temperature",
				"title" : "Temperature",
			} ],
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
		displayEventDetails : displayEventDetails
		
	};

});