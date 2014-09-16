define({

	version : "Insert Version Here",

	webServiceSettings : {
		"" : {
			"MongoPimometer" : "http://mongo.drwahl.me:28017/pi_mometer/pi_collection/"
		},
		"localhost" : {
			"MongoPimometer" : "http://localhost:28017/pi_mometer/pi_collection/"
		}
	},

	clientSettings : {
		"default" : {
			"RefreshInterval" : 60000,
			"RequestTimeout" : 10000,
			"TimezoneOffset" : "put an offset here"
		}
	},

	themesConfig : {
		"Classic" : {
			"css" : "bootstrap-classic.css",
			"post-css" : "none"
		},
		"Cerulean" : {
			"css" : "bootstrap-cerulean.css",
			"post-css" : "none"
		},
		"Cyborg" : {
			"css" : "bootstrap-cyborg.css",
			"post-css" : "none"
		},
		"Redy" : {
			"css" : "bootstrap-redy.css",
			"post-css" : "none"
		},
		"Journal" : {
			"css" : "bootstrap-journal.css",
			"post-css" : "none"
		},
		"Simplex" : {
			"css" : "bootstrap-simplex.css",
			"post-css" : "none"
		},
		"Slate" : {
			"css" : "bootstrap-slate.css",
			"post-css" : "none"
		},
		"Spacelab" : {
			"css" : "bootstrap-spacelab.css",
			"post-css" : "none"
		},
		"United" : {
			"css" : "bootstrap-united.css",
			"post-css" : "none"
		}

	},

	menuConfig : {
		"Thermometer" : [ {
			"name" : "Cook Event History",
			"link" : "thermometer.html",
			"icon" : "icon name"
		} ]
	}
});
