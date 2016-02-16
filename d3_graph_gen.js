"use strict";

var width = $(window).width(),
    height = $(window).height();


var color = d3.scale.category10();

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


var illNodesIndex = [];

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
	illNodesIndex = [];

	svg.selectAll(".node").on('dblclick' , function(d){
		d3.select("#name" + d.index).attr("class", "node-ill");
		nodes[d.index]="ill";
});

}

var NUM_OF_NODES = 100;
var society = gen_society(5,2,NUM_OF_NODES);
f(false, society);

// ok - healthy
// ill - infected
// dead - well...
var nodes = [];

for(var i=0; i<NUM_OF_NODES; i++) {
  nodes[i] = "ok";
}


setInterval(function(){
	var toInfect=[];
	var toDie=[];
	for (var i = 0; i < NUM_OF_NODES; ++i) {
		if  (nodes[i]=="ill") {
			var curr = society.nodes[i];
			toDie.push(i);
			for (var j = 0; j < curr.links.length; ++j) {
				if (nodes[curr.links[j]]=="ok") {
					toInfect.push(curr.links[j]);
				}
			}
		}
	}
	for (var i = 0; i < toDie.length; ++i) {
		if (Math.random()<0.1) {
			//DIE
			nodes[toDie[i]]="dead";
			d3.select("#name" + toDie[i]).style({opacity: 0.1});
		} else if (Math.random()<0.8) {
			//OR LIVE FOREVER
			nodes[toDie[i]]="resurrected";
			d3.select("#name" + toDie[i]).style({stroke: "#000"});
		}
	}
	for (var i = 0; i < toInfect.length; ++i) {
		if (Math.random()<0.9) {
			//STRUGGLE
			nodes[toInfect[i]]="ill";
			d3.select("#name" + toInfect[i]).style({stroke: "#f00"});
		}
	}
}, 2000);
