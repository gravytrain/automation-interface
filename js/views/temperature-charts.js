define(["jquery", "configuration", "charts", "moment"], function($, config, Chart, moment) {

	var myLineChart = null;

	var showLineChart = function(selector, dataElement1) {

		var timeArray = [];
		var s1Array = [];
		var s2Array = [];

		console.log(dataElement1);
		$.each(dataElement1, function(index, obj) {

			if (moment(obj.timestamp).isValid()) {

				if (index % 10 == 0) {
					timeArray.push(moment(obj.timestamp).format("ddd. h:m"));
				} else if (index % 5 == 0) {
					timeArray.push(moment(obj.timestamp).format("h:m"));
				} else {
					timeArray.push("");
				}
				s1Array.push(obj.s1);
				s2Array.push(obj.s2);

			}
		});

		Chart.defaults.global = {
			// Boolean - Whether to animate the chart
			animation : true,

			// Number - Number of animation steps
			animationSteps : 60,

			// String - Animation easing effect
			animationEasing : "easeOutQuart",

			// Boolean - If we should show the scale at all
			showScale : true,

			// Boolean - If we want to override with a hard coded scale
			scaleOverride : false,

			// ** Required if scaleOverride is true **
			// Number - The number of steps in a hard coded scale
			scaleSteps : null,
			// Number - The value jump in the hard coded scale
			scaleStepWidth : null,
			// Number - The scale starting value
			scaleStartValue : null,

			// String - Colour of the scale line
			scaleLineColor : "rgba(0,0,0,.1)",

			// Number - Pixel width of the scale line
			scaleLineWidth : 1,

			// Boolean - Whether to show labels on the scale
			scaleShowLabels : true,

			// Interpolated JS string - can access value
			scaleLabel : "<%=value%>",

			// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
			scaleIntegersOnly : true,

			// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero : false,

			// String - Scale label font declaration for the scale label
			scaleFontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

			// Number - Scale label font size in pixels
			scaleFontSize : 12,

			// String - Scale label font weight style
			scaleFontStyle : "normal",

			// String - Scale label font colour
			scaleFontColor : "#666",

			// Boolean - whether or not the chart should be responsive and resize when the browser does.
			responsive : true,

			// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
			maintainAspectRatio : false,

			// Boolean - Determines whether to draw tooltips on the canvas or not
			showTooltips : true,

			// Array - Array of string names to attach tooltip events
			tooltipEvents : ["mousemove", "touchstart", "touchmove"],

			// String - Tooltip background colour
			tooltipFillColor : "rgba(0,0,0,0.8)",

			// String - Tooltip label font declaration for the scale label
			tooltipFontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

			// Number - Tooltip label font size in pixels
			tooltipFontSize : 14,

			// String - Tooltip font weight style
			tooltipFontStyle : "normal",

			// String - Tooltip label font colour
			tooltipFontColor : "#fff",

			// String - Tooltip title font declaration for the scale label
			tooltipTitleFontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

			// Number - Tooltip title font size in pixels
			tooltipTitleFontSize : 14,

			// String - Tooltip title font weight style
			tooltipTitleFontStyle : "bold",

			// String - Tooltip title font colour
			tooltipTitleFontColor : "#fff",

			// Number - pixel width of padding around tooltip text
			tooltipYPadding : 0,

			// Number - pixel width of padding around tooltip text
			tooltipXPadding : 5,

			// Number - Size of the caret on the tooltip
			tooltipCaretSize : 5,

			// Number - Pixel radius of the tooltip border
			tooltipCornerRadius : 6,

			// Number - Pixel offset from point x to tooltip edge
			tooltipXOffset : 10,

			// String - Template string for single tooltips
			tooltipTemplate : "<%if (label){%><%=label%> - <%}%><%= value %>",

			// String - Template string for single tooltips
			multiTooltipTemplate : "<%= value %>",

			// Function - Will fire on animation progression.
			onAnimationProgress : function() {
			},

			// Function - Will fire on animation completion.
			onAnimationComplete : function() {
			}
		};

		var data = {
			labels : timeArray,
			datasets : [{
				label : "Sensor 1",
				fillColor : "rgba(220,220,220,0.2)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(220,220,220,1)",
				data : s1Array
			}, {
				label : "sensor 2",
				fillColor : "rgba(151,187,205,0.2)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(151,187,205,1)",
				data : s2Array
			}]
		};

		var options = {

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines : true,

			//String - Colour of the grid lines
			scaleGridLineColor : "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth : 1,

			//Boolean - Whether the line is curved between points
			bezierCurve : true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension : 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot : true,

			//Number - Radius of each point dot in pixels
			pointDotRadius : 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth : 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius : 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke : true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth : 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill : true,

			//String - A legend template
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};

		// Get context with jQuery - using jQuery's .get() method.
		var ctx = $(selector).get(0).getContext("2d");
		myLineChart = new Chart(ctx).Line(data, options);

		$(selector).get(0).onclick = function(evt) {
			var activePoints = myLineChart.getPointsAtEvent(evt);
			console.log(evt);
			console.log(activePoints);
			// => activePoints is an array of points on the canvas that are at the same position as the click event.
			ctx.moveTo(evt.layerX, 10);
			ctx.lineTo(evt.layerX, 413);
			ctx.strokeStyle = "brown";
			ctx.stroke();
		};
	};
	
	var destroyChart = function() {
		if(myLineChart != null) {
			myLineChart.destroy();	
		}
	};

	return {
		showLineChart : showLineChart,
		destroyChart : destroyChart
	};
});
