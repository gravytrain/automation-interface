define([ "jquery", "configuration" ], function($, config) {

	$('a.ajax-link').click(function(e){
		if($.browser.msie) e.which=1;
		if(e.which!=1 || $(this).parent().hasClass('active')) return;
		e.preventDefault();
		if($('.btn-navbar').is(':visible'))
		{
			$('.btn-navbar').click();
		}
		$('#loading').remove();
		$('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
		var $clink=$(this);
		History.pushState(null, null, $clink.attr('href'));
		$('ul.main-menu li.active').removeClass('active');
		$clink.parent('li').addClass('active');	
	});
	
	$('ul.main-menu li:not(.nav-header)').hover(function(){
		$(this).animate({'margin-left':'+=5'},300);
	},
	function(){
		$(this).animate({'margin-left':'-=5'},300);
	});
	
	var getMenu = function(selector) {
		var sMenu;
		var menuList = config.menuConfig;
		$.each(menuList, function(menuName, menuObject) {
			
			$(selector).append($('<li></li>').addClass('nav-header hidden-tablet').text(menuName));
			$.each(menuObject, function(index, menuItem) {
				
				$(selector).append($('<li></li>').append($('<a></a>').addClass('ajax-link').attr('href', menuItem.link).append($('<i></i>').addClass(menuItem.icon)).append($('<span></span').addClass('hidden-tablet').text(menuItem.name))));
			});
		});
	};
	
	return {
		getMenu : getMenu
	};

});