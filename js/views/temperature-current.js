define(["jquery", "configuration", "yocto-api", "yocto-temp"], function($, config) {

	var registerHub = function() {
		if (yRegisterHub('http://127.0.0.1:4444/') != YAPI_SUCCESS) {
			alert("Cannot contact VirtualHub on 127.0.0.1");
		} else {
			refresh();
		}
	};

	var refresh = function() {
		var temp, serial = document.getElementById('serial').value;

		if (serial == '') {
			temp = yFirstTemperature();
			if (temp) {
				serial = temp.module().get_serialNumber();
				document.getElementById('serial').value = serial;
			}
		}

		temp1 = yFindTemperature(serial + ".temperature1");
		temp2 = yFindTemperature(serial + ".temperature2");

		if (temp1.isOnline()) {
			var s1 = toFahrenheit(temp1.get_currentValue(), 4);
			var s2 = toFahrenheit(temp2.get_currentValue(), 4);

			$('#s1-current').append(s1);
			$('#s2-current').append(s2);
		} else {
			$('#s1-current').append('DCed');
			$('#s2-current').append('DCed');
		}
		setTimeout('refresh()', 5000);
	}

	return {
		registerHub : registerHub
	};
}); 