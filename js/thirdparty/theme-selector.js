/*! Theme Selector 
 * 
 * Allows Theme switching and initial loading */

define(["jquery", "configuration"], function($, config) {
	
	function toTitleCase(str, oldChar, newChar) {
		if (typeof (oldChar) === 'undefined' || typeof (newChar) === 'undefined') {
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		} else {
			str = str.split(oldChar).join(newChar);
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
	}
	
	var _themes = config.themesConfig;
	
	var switchTheme = function(theme_name) {
		
		theme_name = toTitleCase(theme_name);

		if(_themes[theme_name]['css']) {
			document.getElementById('bs-css').setAttribute('href', 'css/bootstrap-' + theme_name.toLowerCase() + '.css');
		}
		if(_themes[theme_name]['post-css'] != 'none') {
			document.getElementById('bs-css-post').setAttribute('href', 'css/bootstrap-' + theme_name.toLowerCase() + '-post.css');
		} else {
			document.getElementById('bs-css-post').setAttribute('href', '#');
		}
	}

	var current_theme = localStorage.getItem('current_theme') == undefined ? 'Classic' : localStorage.getItem('current_theme');

	switchTheme(current_theme);

	var changeTheme = function($) {
		
		$.each(_themes, function(k, v) {
			text = " " + k;
			$('#themes').append($('<li></li>').append($('<a></a>').attr('data-value', k.toLowerCase()).attr('href', '#').append($('<i></i>').addClass('icon-blank')).append(text)));
		});
		$('#themes a[data-value="' + current_theme.toLowerCase() + '"]').find('i').addClass('icon-ok');

		$('#themes a').click(function(e) {
			e.preventDefault();
			current_theme = $(this).attr('data-value');
			localStorage.setItem('current_theme', current_theme);
			switchTheme(current_theme);
			$('#themes i').removeClass('icon-ok');
			$(this).find('i').addClass('icon-ok');
		});

	}

	var timer = function() {
		if (window.jQuery && window.jQuery.ui) {
			changeTheme(window.jQuery);
		} else {
			window.setTimeout(timer, 100);
		}
	};
	timer();
});
