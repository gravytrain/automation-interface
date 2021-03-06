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
		"temp-tables" : "views/temperature-tables",
		"temp-graphs" : "views/temperature-graphs",
		"temp-charts" : "views/temperature-charts",
		"temp-current" : "views/temperature-current",
		"d3" : "thirdparty/d3.min",
		"charts" : "thirdparty/Chart",
		"moment" : "thirdparty/moment.min",
		"events" : "views/temperature-events",
		"yocto-api" : "thirdparty/yocto_api",
		"yocto-temp" : "thirdparty/yocto_temperature"
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
		"charisma" : [ "jquery" ],
		"yocto-temp" : [ "yocto-api"]
	}
});

require([ "jquery", "utilities", "menu", "configuration", "dropdown", "jquery-ui", "theme", "uniform", "tab", "transition", "tooltip", "popover", "button" ], function($, util, menu, config) {

		var _oClientSettings = config.clientSettings['default'];

		menu.getMenu('.main-menu');
		
		localStorage['defaultTimeFormat'] = _oClientSettings.DefaultTimeFormat;

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