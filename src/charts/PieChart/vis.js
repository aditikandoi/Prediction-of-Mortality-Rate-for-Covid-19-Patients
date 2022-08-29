import * as d3 from 'd3';

const draw = (props) => {
    const data = props.data;
    const gender = ['Male', 'Female'];
    let count = new Array(2).fill(0);
    data.forEach(d => {
        let genderIndex = gender.indexOf(d.gender);
        if (genderIndex + 1)
            count[genderIndex] += 1;
    });

    const dataset = [
        { label: 'Male', count: count[0] },
        { label: 'Female', count: count[1] }
        // { label: 'Unknown', count: count[2] }
    ]

    const dataAll = count[0] + count[1];
    // console.log(dataset)

    d3.select('.vis-piechart > *').remove();
    const margin = { top: 10, right: 20, bottom: 30, left: 40 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    let svg = d3.select('.vis-piechart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')');

    let radius = Math.min(width, height) / 2;

    let color = d3.scaleOrdinal()
        .range(['#6C3483', '#BB8FCE', "#EBDEF0"]);

    let arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    let pie = d3.pie()
        .value(function (d) { return d.count; })
        .sort(null);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);

    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "15px")
        .style("z-index", "10")
        .style("background-color", "#f2aec7")
        .style("color", "#000000")
        .style("border", "solid")
        .style("border-color", "#b31e54")
        .style("padding", "5px")
        .style("border-radius", "2px")
        .style("visibility", "hidden"); 

    svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(d.data.label);
        })
        .attr('transform', 'translate(0, 0)')
        .on('mouseover', function (d) {
            tooltip.style("visibility", "visible").text(d.data.label + ": " + d.data.count);
            console.log(d.label, d.count)

            d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '.85');

            div.transition()
            .duration(50)
            .style("opacity", 1);
            
            
        
        })
        .on("mousemove", d => tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(d.data.label + ": " + (Math.round((d.data.count / dataAll) * 100)).toString() + '%'))


        
       .on('mouseout', function (d, i) {
            d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '1');

            div.transition()
            .duration('50')
            .style("opacity", 0);

            tooltip.style("visibility", "hidden");
            d3.select(this)
            .attr('fill', function (d, i) {
                return color(d.data.label);
            })
       })
        
    let legendG = svg.selectAll(".legend")
        .data(pie(dataset))
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(" + (i * 70 - 100) + "," + 110 + ")"; 
        })
        .attr("class", "legend");

    legendG.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d, i) {
            return color(i);
        });

    legendG.append("text") 
        .text(function (d) {
            return d.data.label;
        })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);
}

export default draw;