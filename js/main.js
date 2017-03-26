/* 
 * @Author: wcs
 * @Date:   2016-12-19 18:15:13
 * @Last Modified by:   wcs
 * @Last Modified time: 2017-03-26 22:14:24
 */

window.onload = () => {
	var width = 600;
	var height = 300;

	var padding = {
		top: 50,
		right: 50,
		bottom: 50,
		left: 50
	};

	var svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);


	var dataset1 = [{
		'(0, 0.2]': 1
	}, {
		'(0.2, 0.4]': 2
	}, {
		'(0.4, 0.6]': 3
	}];
	var obj = {
		x: [],
		y: []
	}
	for (var i = 0; i < dataset1.length; i++) {
		for (var key in dataset1[i]) {
			obj.x.push(key);
			obj.y.push(dataset1[i][key]);
		}
	}
	console.log(obj);

	var xScale = d3.scale.ordinal()
		.domain(obj.x)
		.rangeRoundBands([0, width - padding.left - padding.right - padding.right], 0, 0);

	var yScale = d3.scale.linear()
		.domain([0, d3.max(obj.y)])
		.range([height - padding.top - padding.bottom, 0]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom');
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left');
	svg.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(40,' + (height - padding.top) + ')')
		.call(xAxis);
	svg.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(40, 50)')
		.call(yAxis);

	var rectMargin = 40;
	// 添加矩形
	svg.selectAll('.bar')
		.data(obj.y)
		.enter()
		.append('rect')
		.attr('transform', 'translate(40, 50)')
		.attr('class', 'bar')
		.attr('x', function(d, i) {
			return xScale(obj.x[i]) + rectMargin;
		})
		.attr('y', function(d, i) {
			return yScale(d);
		})
		.attr('width', xScale.rangeBand() - 2 * rectMargin)
		.attr('height', function(d, i) {
			return height - padding.top - padding.bottom - yScale(d);
		})

	/*.attr('fill', function(d, i) {
		return getColor(i);
	})*/
	;
	/*var tree = d3.layout.tree()
		.size([width, height - 200])
		.separation((a, b) => {
			return (a.parent == b.parent ? 1 : 2);
		});*/

	/*d3.json("placeData.json", (error, root) => {
		var nodes = tree.nodes(root);
		var links = tree.links(nodes);

		console.log(nodes);
		console.log(links);

		var diagonal = d3.svg.diagonal()
			.projection((d) => {
				return [d.y, d.x];
			});

		var link = svg.selectAll('.link')
			.data(links)
			.enter()
			.append("path")
			.attr("class", "link")
			.attr("d", diagonal);

		var node = svg.selectAll("circle")
			.data(nodes)
			.enter()
			.append("circle")
			.attr("r",10)
			.style("fill", "steelblue");

		var texts = svg.selectAll("text")
				.data(nodes)
				.enter()
				.append("text")
				.style("fill","black")
				.attr("dx",10)
				.attr("dy",5)
				.text((d) => {
					return d.name;
				});

		
	});*/
}