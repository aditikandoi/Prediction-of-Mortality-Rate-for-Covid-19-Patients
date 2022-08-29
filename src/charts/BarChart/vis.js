import * as d3 from 'd3';
import './style.css';

const draw = (props) => {
    d3.select('.vis-barchart > *').remove();
    const data = props.data;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    let svg = d3.select('.vis-barchart').append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const race = ['Asian', 'White', 'Pacific Islander', 'Black or African American', 'Others'];
    let count = new Array(5).fill(0);
    data.forEach(d => {
        let raceIndex = race.indexOf(d.race);
        if (raceIndex + 1)
            count[raceIndex] += 1;
    });

    const dataset = [
        { label: 'Asian', count: count[0] },
        { label: 'White', count: count[1] },
        { label: 'Pacific Islander', count: count[2] },
        { label: 'Black or African American', count: count[3] },
        { label: 'Others', count: count[4] }
        // { label: 'Unknown', count: count[2] }
    ]

    // format the data
    data.forEach(function(d) {
        d.age = +d.age;
    });

    // Scale the range of the data in the domains
    let x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
    let y = d3.scaleLinear()
          .range([height, 0]);
    x.domain(dataset.map(function(d) { return d.label; }));
    y.domain([0, d3.max(dataset, function(d) { return d.count; })]);

    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "15px")
        .style("z-index", "10")
        .style("background-color", "#efed00")
        .style("color", "#000000")
        .style("border", "solid")
        .style("border-color", "#35544a")
        .style("padding", "5px")
        .style("border-radius", "2px")
        .style("visibility", "hidden"); 

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.label); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); })
        // .style("visibility", "hidden")
        .on("mouseover", function(d){
            tooltip.style("visibility", "visible").text(d.label + ": " + d.count);
            d3.select(this).attr("fill", "#ffb3b3");
        })
        .on("mousemove", d => tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(d.label + ": " + d.count))
        .on("mouseout", function(d) {
            tooltip.style("visibility", "hidden");
            d3.select(this)
        .attr("fill", "#CEBEDE");
        });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
}

export default draw;