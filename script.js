
    
  var margin = { top: 15, right: 55, bottom: 100, left: 77  };
  var width = 800 - margin.right - margin.left;
  var height = 600 - margin.top - margin.bottom;
  var binCount = 10;

    var chart1 = new Chart('#chart1');
//    var chart2 = new Chart('#chart2');

  function Chart (selector) {
      var chart = this;

var format = d3.format(",d");

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10
        .map(function(c) { c = d3.rgb(c); c.opacity = 0.6; return c; }));

// console.log('color', color);        
    
// translates the csv to parent/child node relationship
var stratify = d3.stratify()
    .parentId(function(d) { 
        return d.id.substring(0, d.id.lastIndexOf("."));     
    });
    
//    chart.svg = d3.select(selector)

      
      chart.treemap = d3.treemap()
    .size([width, height])
    .padding(3)
    .round(true);

d3.csv("trade-data.csv", type, function(error, data) {
  if (error) throw error;

  var root = stratify(data)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

  chart.treemap(root);

  d3.select("selector")
    .selectAll(".node")
    .data(root.leaves())
    .enter().append("div")
      .attr("class", "node")
      .attr("title", function(d) { return d.id + "\n" + format(d.value); })
      .style("left", function(d) { return d.x0 + "px"; })
      .style("top", function(d) { return d.y0 + "px"; })
      .style("width", function(d) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 + "px"; })
      .style("background", function(d) { while (d.depth > 1) d = d.parent; return color(d.id); })
    .append("div")
      .attr("class", "node-label")
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g).join("\n"); })
    .append("div")
      .attr("class", "node-value")
      .text(function(d) { return format(d.value); });
});

function type(d) {
  d.value = +d.value;
  return d;
}
      
}

    




