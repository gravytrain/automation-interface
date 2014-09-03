require(["jquery", "tab"], function($, tab) {

	// Dashboard Tabs
	$('#realtimeTabs a:last').tab('show');
	$('#realtimeTabs a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
});