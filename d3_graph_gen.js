"use strict";

var width = $(window).width(),
    height = $(window).height();

	
var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-240)
    .linkDistance(function(d) {
		if (d.value==2) return 10;
		else return 120;
	})
    .size([width, height])
    .linkStrength(function(d) {
		if (d.value==2) return 1.0;
		else return 0.1;
	});
	

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

 function f(error, graph) {
  if (error) throw error;
	d3.selectAll("svg > *").remove() //clear the SVG
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 8)
      .style("fill", function(d) { return color(d.group); })
	  .attr('id', function(d){ return 'name' + d.index; })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
}

var society = gen_society(5,2,100);
f(false, society);


var illNodesIndex = [];
svg.selectAll(".node").on('dblclick' , function(d){ 
	d3.select("#name" + d.index).attr("class", "node-ill");
	illNodesIndex.push(d.index);
});


setInterval(function(){ 

	var connected = []; 
	
	
	console.log(society.nodes[0].links)
	console.log(society.nodes);
	console.log(illNodesIndex);
	
}, 3000);
