
    
    var margin = { top: 15, right: 15, bottom: 45, left: 15  };
    var width = 600 - margin.right - margin.left;
    var height = 600 - margin.top - margin.bottom;

    // add comma to big numbers
    var format = d3.format(",d");


    // generate colors
    var color = d3.scaleOrdinal()
        .range(d3.schemeCategory10
            .map(function(c) { c = d3.rgb(c); 
                              c.opacity = 0.6; 
                              return c; 
                             })
              );

    // console.log('color', color);        


    // translates the csv to parent/child node relationship
    var stratify = d3.stratify()    
        .parentId(function(d) { 
//            if (d.id.substring(0, d.id.lastIndexOf(".")) == 'china') { return d.id.substring(0, d.id.lastIndexOf(".")); }
//            else { return 'red'; } 
            return d.id.substring(0, d.id.lastIndexOf("."));   

        });

    // CHART 1
    d3.csv("imports.csv", type, function(error, data) {
      if (error) throw error;

        var chart1 = new Chart('#chart1', data);
    
}); 
    
    // CHART 2
    d3.csv("exports.csv", type, function(error, data) {
      if (error) throw error;

        var chart2 = new Chart('#chart2', data);    
}); 


    function Chart (selector, data) {
        var chart = this;    
      
        chart.data = data;
        
//        console.log('chat', chart.data);
      
        chart.treemap = d3.treemap()
        .size([width, height])
        .padding(2)
        .round(true);

        var root = stratify(chart.data)
        .sum(function(d) { return d.value; })
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });      
        
// console.log('root', root);        
// console.log('root', chart.treemap(root).children[1].id);                
      
//        if (chart.treemap(root).children[1].id === 'exports.services') {
        chart.treemap(root);            
            
//        }
        


        d3.select(selector)
        .selectAll(".node")
        .data(root.leaves())
        .enter().append("div")
            .attr("class", "node")
            // this is for a tooltip; actual label is below
            .attr("title", function(d) { return d.id + "\n" + format(d.value); })       
            .style("left", function(d) { return d.x0 + "px"; })
            .style("top", function(d) { return d.y0 + "px"; })
            .style("width", function(d) { return d.x1 - d.x0 + "px"; })
            .style("height", function(d) { return d.y1 - d.y0 + "px"; })
            .style("background", function(d) { while (d.depth > 1) d = d.parent; return color(d.id); })
        .append("div")
            // this is the box label
            .attr("class", "node-label")                                                
                .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1)})  
        .append("div")
            // the box value
            .attr("class", "node-value")                                                
            .text(function(d) { return format(d.value); });
        
        
        
/*              selectAll('.node').on('mouseover', function(d) {       
    d3.select("#tooltip")
      .text(d)
    
    d3.select("#tooltip").classed("hidden", false);         //Show the tooltip
    })
        .on('mouseout', function() {                            //Hide the tooltip
        d3.select("#tooltip").classed("hidden", true);
    } );  */    
    
    
    
            
            
            
        
        

//        chart.update();
  }
      
//    Chart.prototype.update = function () {
//        var chart = this;
//
//
//        
//    }
    
    
/*    d3.select("div").on("click", function() {
        if (d3.select('div').classed('active') === false) {
            console.log("here");
            d3.select('div').classed('active', true);
  
        } else {
                console.log("here 2");
            d3.select('div').classed('active', false);
//            updateTable();
        }    
        
        
    });  */  


function type(d) {
  d.value = +d.value;
  return d;
}



    




