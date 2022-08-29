import * as d3 from 'd3';

const draw = (props) => {
    const data = props.data;
    console.log(data);
    d3.select('.vis-scatterplot > *').remove();
    let margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const width = props.width - margin.left - margin.right;;
    const height = props.height - margin.top - margin.bottom;
    let svg = d3.select(".vis-scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
        d.days = +d.days;
        d.VALUE = +d.VALUE;
    });
    

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {return d.days; })])
            .range([0, width]);
    let y = d3.scaleLinear()
            .domain([d3.min(data, function(d) {return d.VALUE; }), d3.max(data, function(d) {return d.VALUE; })])
            .range([height, 0]);

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
 

    var color = d3.scaleOrdinal()
    .domain(["Survivor", "Non-survivor" ])
    .range([ "green", "red"])


    var highlight = function(d){

        let selected_vital = d.survivor

        d3.selectAll(".dot")
        .transition()
        .duration(200)
        .style("fill", "lightgrey")
        .attr("r", 3)

        d3.selectAll("." + selected_vital)
        .transition()
        .duration(400)
        .style("fill", color(selected_vital))
        .attr("r", 7)

    }

    // Highlight the specie that is hovered
    var doNotHighlight = function(){


        d3.selectAll(".dot")
        .transition()
        .duration(400)
        .style("fill", "lightgrey")
        .attr("r", 5 )
    }


    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", function (d) { return "dot " + d.survivor } )
            .attr("cx", function (d) { return x(d.days); } )
            .attr("cy", function (d) { return y(d.VALUE); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.survivor) } )
            .on("mouseover", highlight)
            .on("mouseleave", doNotHighlight );


    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width-500)
        .attr("y", height + margin.top + 5)
        .text("days");

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+10)
        .attr("x", -margin.top-50)
        .text("values");

    svg.append("circle").attr("cx",30).attr("cy",10).attr("r", 4).style("fill", "green")
    svg.append("circle").attr("cx",120).attr("cy",10).attr("r", 4).style("fill", "red")
    svg.append("text").attr("x", 40).attr("y", 10).text("Survivors").style("font-size", "12px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 130).attr("y", 10).text("Non-survivors").style("font-size", "12px").attr("alignment-baseline","middle")
        
        
}

export default draw;