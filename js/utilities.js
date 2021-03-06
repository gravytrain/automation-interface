define(["jquery", "noty", "chosen", "modal", "alert", "typeahead", "datatables"], function($, noty, chosen, modal, alert, typeahead, DataTable) {
	// ------------- Functions ---------------

	// Gets the users current location and redirects them to the login page.
	var getCurrentPage = function() {
		var path = window.location.pathname;
		var page = path.substring(path.lastIndexOf('/') + 1);
		return page;
	};

	var setToLogin = function() {
		var page = getCurrentPage();
		location.href = location.href.replace(page, 'login.html');
	};

	// clears sessionStorage and redirects to the login page
	var logoutUser = function() {

		var logout = document.getElementById('#logout');
		sessionStorage.clear();
		location.href = location.href.replace(location.href, 'login.html');
	};

	var autoCloseAlert = function(selector, delay) {
		var alert = $(selector).alert();
		window.setTimeout(function() {
			alert.alert('close');
		}, delay);
	};

	// Gets the current User Preferences and displays a modal to modify them.
	var getPreferences = function() {
		var pModal;
		var defaultTimeFormat = 'ddd. h:m';
		var setTimeFormat = localStorage['time-format'];
		if (setTimeFormat != undefined) {
			useTime = setTimeFormat;
		} else {
			useTime = defaultTimeFormat;
		}
		currentDoc = document.location.pathname.match(/[^\/]+$/)[0];
		dTimeFormat = '<p>Set the displayed Time Format? <input data-no-uniform="true" type="text" id="setTimeFormat" value="' + useTime + '"></p>';
		pModal = '<div class="modal hide fade dynamicModalElement" id="myPreferences">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal"></button>' + '<h3>My Preferences</h3>' + '</div>' + '<div class="modal-body">';
		pModal += dTimeFormat;
		pModal += '</div>' + '<div class="modal-footer">' + '<a href="#" class="btn cancelModal" data-dismiss="modal">Close</a>' + '<a href="#" class="btn btn-primary submitPrefChange">Save changes</a>' + '</div>' + '</div>';

		displayModal('#myPreferences', pModal);

		$('.submitPrefChange').on("click", function() {
			localStorage['time-format'] = $('input#setTimeFormat').val();
			$('#myPreferences').modal('hide');
		});

	};

	var confirmationModal = function(callback) {

		console.log("Setup Confirmation Modal");

		var pModal = $('<div></div>').addClass('modal fade dynamicModalElement').attr('id', 'ConfirmModal').attr('role', 'dialog');
		var mDialog = $('<div></div>').addClass('modal-dialog modal-sm');
		var mContent = $('<div></div>').addClass('modal-content');
		var mHeader = $('<div></div>').addClass('modal-header');
		var mTitle = $('<h4></h4>').addClass('modal-title').attr('id', 'confirmLabel').text('Are you sure?');
		var mBody = $('<div></div>').addClass('modal-footer');

		mHeader.append(mTitle);
		mContent.append(mHeader);
		mBody.append($('<a></a>').addClass('btn btn-primary cancelModal').attr('id', 'confirmTrue').text('Yes'));
		mBody.append($('<a></a>').addClass('btn btn-cancel cancelModal').attr('id', 'confirmFalse').text('No'));

		mContent.append(mBody);
		mDialog.append(mContent);
		pModal.append(mDialog);

		console.log(pModal);
		displayModal('#ConfirmModal', pModal);

		var confirmVal = $('#confirmTrue').on('click', function(e) {
			e.preventDefault();
			console.log('Confirmation True');
			$('#ConfirmModal').modal('hide');
			callback();
		});

		var confirmVal = $('#confirmFalse').on('click', function(e) {
			event.preventDefault();
			console.log('Confirmation False');
			$('#ConfirmModal').modal('hide');
		});

		console.log(confirmVal);
		return confirmVal;

	};

	// Helper function to add and display a modal to any page.
	var displayModal = function(element, modalDiv) {
		console.log("Displaying Modal");
		$('.pageModals').append(modalDiv);
		$(element).modal('show');
	};

	var toTitleCase = function(str, oldChar, newChar) {
		if ( typeof (oldChar) === 'undefined' || typeof (newChar) === 'undefined') {
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		} else {
			str = str.split(oldChar).join(newChar);
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
	};

	// Checks if any fields are missing and if they are, I am returning a null
	// value. This keeps datatables happy when you are expecting a field but it
	// is
	// not returned by your ajax request.
	var checkMissing = function(field) {
		if (field == null) {
			return null;
		} else {
			return field;
		}
	};

	var toFahrenheit = function(value, float) {
		var degF = '&deg;F';
		var retVal = value * 1.8 + 32;
		retVal = parseFloat(retVal.toPrecision(float));
		retVal = retVal + '&deg; F';

		return retVal;
	};
	// -------------- End Functions --------------

	// $(document).on("click", ".submitPrefChange" ,function(event){
	// prefValue = $('#myPreferences').val($('#setDefaultPage').val());
	// setPreferences(prefValue);
	// });

	$("div ul li #Preferences").on("click", function() {
		getPreferences();
	});

	$("div ul li #logout").on("click", function() {
		logoutUser();
	});

	$(document).on("click", ".modal-backdrop, .cancelModal", function(event) {
		$('.modal input').typeahead('destroy');
		$('.modal input').val('');
		$('.dynamicModalElement').remove();
		$('.modal').modal('hide');
	});

	$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
		return {
			"iStart" : oSettings._iDisplayStart,
			"iEnd" : oSettings.fnDisplayEnd(),
			"iLength" : oSettings._iDisplayLength,
			"iTotal" : oSettings.fnRecordsTotal(),
			"iFilteredTotal" : oSettings.fnRecordsDisplay(),
			"iPage" : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
			"iTotalPages" : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
		};
	};
	$.extend($.fn.dataTableExt.oPagination, {
		"bootstrap" : {
			"fnInit" : function(oSettings, nPaging, fnDraw) {
				var oLang = oSettings.oLanguage.oPaginate;
				var fnClickHandler = function(e) {
					e.preventDefault();
					if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
						fnDraw(oSettings);
					}
				};

				$(nPaging).addClass('pagination').append('<ul>' + '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' + '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' + '</ul>');
				var els = $('a', nPaging);
				$(els[0]).bind('click.DT', {
					action : "previous"
				}, fnClickHandler);
				$(els[1]).bind('click.DT', {
					action : "next"
				}, fnClickHandler);
			},

			"fnUpdate" : function(oSettings, fnDraw) {
				var iListLength = 5;
				var oPaging = oSettings.oInstance.fnPagingInfo();
				var an = oSettings.aanFeatures.p;
				var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

				if (oPaging.iTotalPages < iListLength) {
					iStart = 1;
					iEnd = oPaging.iTotalPages;
				} else if (oPaging.iPage <= iHalf) {
					iStart = 1;
					iEnd = iListLength;
				} else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
					iStart = oPaging.iTotalPages - iListLength + 1;
					iEnd = oPaging.iTotalPages;
				} else {
					iStart = oPaging.iPage - iHalf + 1;
					iEnd = iStart + iListLength - 1;
				}

				for ( i = 0, iLen = an.length; i < iLen; i++) {
					// remove the middle elements
					$('li:gt(0)', an[i]).filter(':not(:last)').remove();

					// add the new list items and their event handlers
					for ( j = iStart; j <= iEnd; j++) {
						sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
						$('<li ' + sClass + '><a href="#">' + j + '</a></li>').insertBefore($('li:last', an[i])[0]).bind('click', function(e) {
							e.preventDefault();
							oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
							fnDraw(oSettings);
						});
					}

					// add / remove disabled classes from the static elements
					if (oPaging.iPage === 0) {
						$('li:first', an[i]).addClass('disabled');
					} else {
						$('li:first', an[i]).removeClass('disabled');
					}

					if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
						$('li:last', an[i]).addClass('disabled');
					} else {
						$('li:last', an[i]).removeClass('disabled');
					}
				}
			}
		}
	});

	return {
		getCurrentPage : getCurrentPage,
		setToLogin : setToLogin,
		logoutUser : logoutUser,
		autoCloseAlert : autoCloseAlert,
		getPreferences : getPreferences,
		confirmationModal : confirmationModal,
		displayModal : displayModal,
		toTitleCase : toTitleCase,
		checkMissing : checkMissing,
		toFahrenheit : toFahrenheit
	};
});
