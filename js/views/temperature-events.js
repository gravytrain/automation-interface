define(["jquery", "configuration", "moment", "modal", "utilities"], function($, config, moment, modal, util) {

	var eventBuilder = function() {
		pModal = '<div class="modal hide fade dynamicModalElement" id="new-event">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal"></button>' + '<h3>New Event</h3>' + '</div>' + '<div class="modal-body">';
		pModal += '<form class="form-horizontal"><fieldset><div class="control-group">';
		pModal += '<label class="control-label" for="event-name"> Event Name </label><div class="controls"><input data-placeholder="" name="event-name"></div><br />';
		pModal += '<label class="control-label" for="food-type"> Food Type </label><div class="controls"><input data-placeholder="" name="food-type"></div><br />';
		pModal += '<label class="control-label" for="sensor1"> Sensor 1 Location </label><div class="controls"><input data-placeholder="" name="sensor1"></div><br />';
		pModal += '<label class="control-label" for="sensor2"> Sensor 2 Location </label><div class="controls"><input data-placeholder="" name="sensor2"></div><br />';
		pModal += '<label class="control-label" for="rub-recipe"> Rub Recipe </label><div class="controls"><input data-placeholder="" name="rub-recipe"></div>';
		pModal += '</div></fieldset></form>';
		pModal += '</div>' + '<div class="modal-footer">' + '<a href="#" class="btn cancelModal" data-dismiss="modal">Close</a>' + '<a href="#" class="btn btn-primary submitPrefChange">Save changes</a>' + '</div>' + '</div>';

		util.displayModal('#new-event', pModal);
	};

	return {
		eventBuilder : eventBuilder
	}
});
