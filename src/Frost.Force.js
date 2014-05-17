Frost.namespace("Frost.Force");

function Force(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.padding = 1.5, // separation between same-color nodes
    this.clusterPadding = 6, // separation between different-color nodes
	this.maxRadius = Math.min(this.width, this.height) * 0.25 /2;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
}
Force.prototype.getType = function() {
	return this.type;
};
Force.prototype.getHeight = function() {
	return this.height;
};

Force.prototype.setHeight = function(data) {
	this.height = data;
};

Force.prototype.getWidth = function() {
	return this.width;
};

Force.prototype.setWidth = function(data) {
	this.Width = data;
};
Force.prototype.getContainer = function() {
	return this._container;
};
Force.prototype.setContainer = function(data) {
	this._container = data;
};
Force.prototype.getParent = function() {
	return this._parent;
};
Force.prototype.getData = function() {
	return this.data;
};
Force.prototype.getColorList = function() {
	return this.colorList;
};
Force.prototype.getSeriesName = function() {
	return this._seriesName;
};

Force.prototype.render = function() {
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0];
		var y0 = d3.mouse(this)[1];
		that.detail.setContent({position: {x: x0, y:y0},contentValue: d.package + "->" + d.name +": "+d.value});
	}
	function tick(e) {
	  node.each(that.cluster(10 * e.alpha * e.alpha))
	      .each(that.collide(.5))
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; });
	}
	var width = this.getWidth();
	var height = this.getHeight();
	var formatData = Frost.Util.formatDataForForce(this.getData(), this.maxRadius);
	this._groupContainer = this._container.append("g").attr("class", "frost_force");
	var colorList = Frost.Util.getColorListForBubble(this.getData(), this.getData().length);
	// var legendColor = [];
	this.clusters = formatData.clusters;
	this._formatData = formatData.data;
	var force = d3.layout.force()
    					 .nodes(this._formatData)
    				     .size([width, height])
    					 .gravity(.02)
    					 .charge(0)
    					 .on("tick", tick)
    					 .start();
	var node = this._groupContainer.selectAll("circle")
		    		  .data(this._formatData)
		  			  .enter().append("circle")
		    		  .style("fill", function(d) { return colorList[d.package]; })
		    		  .call(force.drag);
	if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
    node.append("text")
      	.attr("dy", ".3em")
      	// .style("text-anchor", "middle")
      	// .text(function(d) { return d.name.substring(0, d.r / 3);});
      	.text("123");  	  	
	node.transition()
	    .duration(750)
	    .delay(function(d, i) { return i * 5; })
	    .attrTween("r", function(d) {
	      var i = d3.interpolate(0, d.radius);
	      return function(t) { return d.radius = i(t); };
	    });
	this._node = node;
	return this;
};

Force.prototype.cluster = function(alpha) {
	var that = this;
	return function(d) {
	    var cluster = that.clusters[d.cluster];
	    if (cluster === d) return;
	    var x = d.x - cluster.x,
	        y = d.y - cluster.y,
	        l = Math.sqrt(x * x + y * y),
	        r = d.radius + cluster.radius;
	    if (l != r) {
		    l = (l - r) / l * alpha;
		    d.x -= x *= l;
		    d.y -= y *= l;
		    cluster.x += x;
		    cluster.y += y;
    	}
    };
};

Force.prototype.collide = function(alpha) {
	var that = this;
    var quadtree = d3.geom.quadtree(that._formatData);
	return function(d) {
	    var r = d.radius + that.maxRadius + Math.max(that.padding, that.clusterPadding),
	        nx1 = d.x - r,
	        nx2 = d.x + r,
	        ny1 = d.y - r,
	        ny2 = d.y + r;
	    quadtree.visit(function(quad, x1, y1, x2, y2) {
	      if (quad.point && (quad.point !== d)) {
	        var x = d.x - quad.point.x,
	            y = d.y - quad.point.y,
	            l = Math.sqrt(x * x + y * y),
	            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? that.padding : that.clusterPadding);
	        if (l < r) {
	          l = (l - r) / l * alpha;
	          d.x -= x *= l;
	          d.y -= y *= l;
	          quad.point.x += x;
	          quad.point.y += y;
	        }
	      }
	      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	    });
	};
};
Frost.Force = Force;