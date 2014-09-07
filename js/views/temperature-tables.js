define([ "jquery", "configuration", "datatables" ], function($, config, DataTable) {
  
  var _host = window.location.host; 
  var _oWebService = config.webServiceSettings[_host];
  
	var getEventList = function() {
	  	$.ajax({
		url : '',
		dataType : 'jsonp',
		timeout : 4000,
		success : function(data) {

			aData.status = agentStatus(data.agentStatus);
			var table = $('.existing-users').DataTable();
			table.row(rowIndex).data(aData).draw(false);
		}
	});
	  
	}
  
	var displayEventDetails = function(selector, event, sensor) {
	  
	  var config;
	  $(selector).closest(".box").children(".box-header").children("h2").html( event + " Historical Temperatures : " + sensor ); 
	  
		var table = $(selector).DataTable({
		  "ajax" : {
		  	"url" : _oWebService.MongoPimometer,
			"dataType" : "jsonp",
			"jsonp" : 'jsonp',
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
		  "info" : true,
		  "language" : {
		    "emptyTable" : "Historical Temperatures not yet available.",
		  },
		  "initComplete" : function( data ) {
		    setInterval( function() {
		      table.ajax.reload();
		    }, config.poll_interval*1000 );
		  }
		}); 
	};
	
	return {
		displayEventDetails : displayEventDetails
		
	};

});