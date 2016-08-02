
    
  var margin = { top: 15, right: 15, bottom: 15, left: 15  };
  var width = 600 - margin.right - margin.left;
  var height = 600 - margin.top - margin.bottom;

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

      

d3.csv("trade-data.csv", type, function(error, dat) {
  if (error) throw error;
    data = dat;
    
    var chart1 = new Chart('#chart1', data);
//    var chart2 = new Chart('#chart2');    
    
}); 
    

d3.csv("flare2.csv", type, function(error, dat) {
  if (error) throw error;
    data = dat;
    
//    var chart1 = new Chart('#chart1');
    var chart2 = new Chart('#chart2', data);    
    
}); 


  function Chart (selector, data) {
      var chart = this;    
      
      chart.data = data;
      
      chart.treemap = d3.treemap()
    .size([width, height])
//    .size([400, 400])
    .padding(3)
    .round(true);

  var root = stratify(chart.data)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });      
      
  chart.treemap(root);

  d3.select(selector)
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
        .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1)})  
    .append("div")
      .attr("class", "node-value")
      .text(function(d) { return format(d.value); });

  }
      
function type(d) {
  d.value = +d.value;
  return d;
}



    




