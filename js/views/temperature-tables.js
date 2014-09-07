define([ "jquery", "configuration", "datatables" ], function($, config, DataTable) {
  
	var displayEventDetails = function(selector, event, sensor) {
	  
		$(selector).closest(".box").children(".box-header").children("h2").html( event + " Historical Temperatures : " + sensor ); 
	  
		$(selector).DataTable({
		  "ajax" : {
		  	"url" : "http://mongo.drwahl.me:28017/pi_mometer/pi_collection/",
			"dataType" : "jsonp",
			"jsonp" : 'jsonp',
			"dataSrc" : function( json ) {
			  var temp = new Object();
			  var newArray = [];
			  $.each(json.rows, function(index, row) {
			    if( row['_id'] == event ) {
			      $.each(row[sensor], function(index, element) {
				    temp["timestamp"] = Object.keys(element)[0];
				    temp["temperature"] = element[Object.keys(element)[0]];
				    newArray.push(temp);
			      });
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
		  }
		}); 
	};
	
	return {
		displayEventDetails : displayEventDetails
		
	};

});