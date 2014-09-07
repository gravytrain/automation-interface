requirejs.config({
	// By default load any module IDs from js/lib
	baseUrl : 'js',
	// except, if the module ID starts with "app",
	// load it from the js/app directory. paths
	// config is relative to the baseUrl, and
	// never includes a ".js" extension since
	// the paths config could be for a directory.
	paths : {
		"jquery" : "jquery/jquery.min",
		"jquery-ui" : "jquery/jquery-ui-1.8.21.custom.min",
		"transition" : "bootstrap3/transition",
		"alert" : "bootstrap3/alert",
		"modal" : "bootstrap/bootstrap-modal",
		"dropdown" : "bootstrap3/dropdown",
		"scrollspy" : "bootstrap3/scrollspy",
		"tab" : "bootstrap3/tab",
		"tooltip" : "bootstrap3/tooltip",
		"popover" : "bootstrap3/popover",
		"button" : "bootstrap3/button",
		"typeahead" : "thirdparty/typeahead.jquery",
		"cookie" : "jquery/jquery.coookie",
		"datatables" : "jquery/jquery.dataTables",
		"chosen" : "thirdparty/chosen.jquery.min",
		"uniform" : "jquery/jquery.uniform.min",
		"noty" : "jquery/jquery.noty",
		"history" : "jquery/jquery.history",
		"serialize-object" : "jquery/jquery.serializeObject",
		"charisma" : "thirdparty/charisma",
		"menu" : "views/main-menu",
		"theme" : "thirdparty/theme-selector",
		"temp-table" : "views/temperature-tables"
	},
	// shim
	shim : {
		"jquery-ui" : [ "jquery" ],
		"transition" : [ "jquery" ],
		"alert" : [ "jquery" ],
		"modal" : [ "jquery" ],
		"dropdown" : [ "jquery" ],
		"scrollspy" : [ "jquery" ],
		"tab" : [ "jquery" ],
		"tooltip" : [ "jquery" ],
		"popover" : [ "jquery", "tooltip" ],
		"button" : [ "jquery" ],
		"typeahead" : [ "jquery" ],
		"cookie" : [ "jquery" ],
		"chosen" : [ "jquery" ],
		"uniform" : [ "jquery" ],
		"noty" : [ "jquery" ],
		"history" : [ "jquery" ],
		"serialize-object" : [ "jquery" ],
		"charisma" : [ "jquery" ]
	}
});

require([ "jquery", "utilities", "menu", "dropdown", "jquery-ui", "theme", "uniform", "tab" ], function($, util, menu) {

		menu.getMenu('.main-menu');

		$( document ).ready( function() {
		$('ul.main-menu li a').each(function() {
			if ($($(this))[0].href == String(window.location))
				$(this).parent().addClass('active');
		});

		$('ul.main-menu li:not(.nav-header)').hover(function() {
			$(this).animate({
				'margin-left' : '+=5'
			}, 300);
		}, function() {
			$(this).animate({
				'margin-left' : '-=5'
			}, 300);
		});
		
		});
	
});