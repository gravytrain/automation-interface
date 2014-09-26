define(["jquery", "configuration", "d3"], function($, config, d3) {

	var _host = window.location.host;
	var _oWebService = config.webServiceSettings[_host];
	var _oClientSettings = config.clientSettings['default'];

	var showLineGraph = function(selector, dataElement) {

		var margin = {
			top : 10,
			right : 10,
			bottom : 10,
			left : 40
		};
		var width = 960 - margin.left - margin.right;
		var height = 250 - margin.top - margin.bottom;

		var data = dataElement.slice();
		var format = d3.time.format('%Y-%m-%dT%H:%M:%S.%L');

		var tempFn = function(d) {
			return d.temperature;
		};
		var dateFn = function(d) {
			return format.parse(d.timestamp.substring(0, 23));
		};

		var x = d3.time.scale().range([20, 920]).domain(d3.extent(data, dateFn));

		var y = d3.scale.linear().range([180, 20]).domain(d3.extent(data, tempFn));

		var xAxis = d3.svg.axis().scale(x).orient("bottom");

		var yAxis = d3.svg.axis().scale(y).orient("left");

		var line = d3.svg.line().x(function(d, i) {
			return x(dateFn(d));
		}).y(function(d, i) {
			return y(tempFn(d));
		});

		var svg = d3.select(selector).append("svg:svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);

		svg.append("svg:path").attr("d", line(data));

		svg.selectAll("circle").data(data.sort(function(a, b) {
			return a.timestamp - b.timestamp;
		}), function(d) {
			return d.temperature;
		}).enter().append("svg:circle").attr("r", 4).attr("cx", function(d) {
			return x(dateFn(d));
		}).attr("cy", function(d) {
			return y(tempFn(d));
		});

		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + 180 + ")").call(xAxis);

		svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 50).attr("dy", ".71em").style("text-anchor", "end").text("Temperature");

	};

	return {
		showLineGraph : showLineGraph,
	};

});
