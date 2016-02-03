function HLine(obj) {
	this.y = obj.y;
	this.x0 = obj.x0;
	this.xf = obj.xf;
	this.L = obj.xf - obj.x0;
};

HLine.prototype.intersectSegment = function(p0, pf) { 
// definitions: segment is the line connecting p0 and pf 
//  			s is the percentage along segment where intersection with hline occurs
// 				xint is the x intercept of segment with hline
// 
// notes: check for s should be first since segments are most likely "small" and miss hline altogether.
// 		  s is also easier to compute than xint.
	
	if (p0.y !== pf.y) { // for usual case where segment is not horizontal
		// find if segment intersects this hline within the segment
	    var s = (this.y - p0.y)/(pf.y - p0.y);
	    if (s >= 0 && s <= 1) {
	    	// if it does, get x intercept of segment with this hline
	    	var xint = p0.x + (pf.x - p0.x)*(this.y - p0.y)/(pf.y - p0.y);
	    	// if x intercept is within this hline, return xint
	    	return (xint >= this.x0 && xint <= this.xf) ? xint : null;
	    }
	    else {
	    	return null;
	    }
	}
	else { // for corner case where segment is horizontal
		if (p0.y === this.y) {
			return .5*(p0.x + pf.x);
		}
		else { // if they are not horizontal at the same level, then there is no intercept.
			return null;
		}
	}
	

}

HLine.prototype.pointsInPoly = function(poly, dx) {
// assumes that line segment endpoints are outside of polygon

	var intersections = [];
	
	var intersect;
	for (i=0; i<poly.length; i++) {
		var intersect = this.intersectSegment(poly[i], poly[(i+1)%poly.length]);
		intersect && intersections.push(intersect);
	};

	intersections.sort(function (a,b) {
		if (a < b) return -1
		else if (a > b) return 1;
		else return 0;
	});

	if (intersections.length===0) {
		return [];
	}

	var points = [],
		io = false,
		current = 0;

	for (var x=this.x0; x<this.xf; x+=dx) {
		if (x >= intersections[current]) {
			io = !io;
			current++;
		}
		if (x<intersections[current]) io && points.push({x: x, y: this.y});
	};

	return points;
};

function Grid(obj) {
	this.x0 = obj.x0;
	this.xf = obj.xf;
	this.dx = obj.dx;
	this.y0 = obj.y0;
	this.yf = obj.yf;
	this.dy = obj.dy;
};

Grid.prototype.pointsInPoly = function(poly) {
// assumes that grid boundaries can totally encompass poly

	var points = [];
	for (var y=this.y0; y<this.yf; y+=this.dy) {
		var hline = new HLine({x0: this.x0, xf: this.xf, y: y});
		points = points.concat(hline.pointsInPoly(poly, this.dx));
	}
	return points;
}