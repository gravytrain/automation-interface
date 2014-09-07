require(["jquery", "temp-table", "datatables"], function($, tempTable, DataTable) {

   tempTable.getEventList('#selectEvent');
  
   $('#selectEvent').on('change', function(evt) {
      var selected = $('#selectEvent option:selected').text();

      tempTable.displayEventDetails('#historic-s1', selected, 's1');
      tempTable.displayEventDetails('#historic-s2', selected, 's2');
   });
});