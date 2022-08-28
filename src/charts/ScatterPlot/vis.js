import * as d3 from 'd3';
// import './style.css';

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
    .range([ "#440154ff", "#21908dff"])


    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { console.log(d.days); return x(d.days); } )
            .attr("cy", function (d) { console.log(d.VALUE); return y(d.VALUE); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.survivor) } );



        
}

export default draw;