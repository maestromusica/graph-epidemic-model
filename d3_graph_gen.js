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

var society = gen_society(5,1,100);
f(false, society);


var illNodesIndex = [];


svg.selectAll(".node").on('dblclick' , function(d){ 
	d3.select("#name" + d.index).attr("class", "node-ill");
	
	illNodesIndex.push(d.index);
});

setInterval(function(){
	var newIllNodes=illNodesIndex.slice();
	for (var i=0;i<illNodesIndex.length;++i) {
		//for every neighbour
		var current = society.nodes[illNodesIndex[i]];
		for (var j=0; j<current.links.length;++j) {
			if (newIllNodes.indexOf(current.links[j])==-1)
				newIllNodes.push(current.links[j]);

setInterval(function(){ 


	console.log(illNodesNe);
	
	var newNe = [];
	for(var i=illNodesNe.length; i>=0; i--) {
		d3.select("#name" + illNodesNe[illNodesNe.length - 1]).attr("class", "node-ill");
		
		console.log(illNodesNe[illNodesNe.length - 1]);
		if(illNodesNe.length > 0) {
			newNe.push(society.nodes[illNodesNe[illNodesNe.length - 1]].links);
		}
	}
	for (var i=0;i<newIllNodes.length;++i)
		d3.select("#name" + newIllNodes[i]).attr("class", "node-ill");
	illNodesIndex=newIllNodes;
}, 1000);

