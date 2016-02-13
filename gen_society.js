"use strict";

function gen_society(m0,m,n) {
	var array = []; //array of edges
	var deg = [];	//array of nodes' degrees
	var nodes = [];
	var sum_deg = 0;
	var i = 0;
	for (;i<m0;++i) {
		var node = {"name":"","group":0,"links":[]};;
		node.name="Patient "+i;
		node.group=i;
		
		deg[i]=0;
		for (var j = 0; j<i;++j) {
			var edge={"source":0,"target":0,"value":1};
			edge.source=i;
			edge.target=j;
			
				node.links.push(j);
				nodes[j].links.push(i);

			edge.value=1;
			array.push(edge)
			
			++deg[i];
			++deg[j];
			sum_deg+=2;
		}
		
		nodes.push(node);
	}
	//ordinary nodes with m edges
	for (;i<n;++i) {
		var node = {"name":"","group":0,"links":[]};;
		node.name="Patient "+i;
		node.group=-1 //unset
	
		deg[i]=0; //by the end of iteration should be m
		var forbidden = [];
		while (deg[i] < m) {
			var r = Math.random()*sum_deg;
			//weighted rand
			var sum = 0;
			for (var j = 0; j < i; ++j) {
				if (r < sum+deg[j]) {
					if (forbidden.indexOf(j)==-1) {
					
						forbidden.push(j);
						if (node.group==(-1)) node.group=nodes[j].group;
						
						
						var edge={"source":0,"target":0,"value":1};
						edge.source=i;
						edge.target=j;
						
							node.links.push(j);
							nodes[j].links.push(i);
						
						if (node.group==nodes[j].group) edge.value=2; //close friends
						else edge.value=1; //not close friends
						
						array.push(edge)
						++deg[i];
						++deg[j];
						sum_deg+=1;
					}
					break;
				}
				sum+=deg[j];
			}
		}
		
		nodes.push(node);
		sum_deg+=m;
	}
	var obj={};
	obj.nodes=nodes;
	obj.links=array;
	obj.deg=deg;
	return obj;
}