// Parse floor plans.
// Deprecated - replaced by Python script for Rhinoceros 3d.

// Workflow:
// - create or modify rooms.ai to conform to exact layer structure. Layers correspond to id's in svg code.
// - split by artboard.
// - run this parsing code on svg's to extract geometry.

var cheerio = require('cheerio'),
	fs = require('fs'),
	$;

var getRectAttributes = function($rect) {
	var fn = function(attrKey) {
		return parseFloat($rect.attr(attrKey));
	}
	return {
		location: [ fn('x'), fn('y') ],
		dimensions: [ fn('width'), fn('height') ]
	};
};

var getPolylineAttributes = function($polyline) {
	return {
		points: $polyline.attr('points').split('\n')
	}
};

var getSpaceInformation = function($el) {
	var res = {}, innerRect, innerPolyline;
	res.id = $el.attr('id');
	innerRect = $el.find('rect')[0];
	innerPolyline = $el.find('polyline')[0];
	if (innerRect == null && innerPolyline == null) { return; }
	if (innerRect) {
		res.location = getRectAttributes($(innerRect)).location;
		res.dimensions = getRectAttributes($(innerRect)).dimensions;
	}
	if (innerPolyline) {
		res.points = getPolygonAttributes($(innerPolygon));
	}
	return res;
};

fs.readFile('./app/assets/images/rooms_dc-08.svg', 'utf-8', function(err, doc) {

	if (err) { return console.dir(err); }
	$ = cheerio.load(doc);

	// Get wall coordinates
	console.log($('#walls polyline').attr('points'));

	$('#spaces g').each(function() {
		var $el = $(this);
		console.log(getSpaceInformation($el));
	});

});

