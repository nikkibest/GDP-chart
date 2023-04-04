const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
const margin = {top: 10, right: 10, bottom: 20, left: 60}
const widthOfSvg = 1050 - margin.right - margin.left;
const heightOfSvg = 800*.6 - margin.top - margin.bottom;
const padding = 60;

async function getData() {
  try {
    const response = await fetch(url);
    const allData = await response.json()
    const data = allData.data;
    // Add title and description
    document.getElementsByClassName("title")[0].innerHTML = allData["name"];
    document.getElementsByClassName("supbar")[0].innerHTML = allData["description"];

    let xScaleBandwidth = widthOfSvg / data.length;

    // Calculate parameters for the d3 element
    const xScale = d3.scaleLinear()
      .domain([0, data.length-1])
      .range([0, widthOfSvg])
    
    console.log(data[0][0])
    let datesArray = data.map((item) => {
      return new Date(item[0])
    });
    console.log(d3.extent(datesArray))

    const xAxisTime = d3.scaleTime()
      .domain(d3.extent(datesArray))
      .range([0, widthOfSvg])

    const xAxis = d3.axisBottom(xAxisTime);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([heightOfSvg, 0])
    
    const yAxis = d3.axisLeft(yScale);

    const color = d3.scaleLinear()
      .domain([0, data.length*.33, data.length*.66, data.length])
      .range(['#B58929', '#C61C6F', '#268BD2', '#85992C'])

    let tempColor; // Temporary color holder, when mouse hovers over d3 element

    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    //////////////// Create tooltip - the pop up message when you hover //////////////////
    let tooltip = d3.select('.chart')
    .append('div')
    .classed('tooltip', true)
    .style('position', 'absolute')
    .style('padding', '2px 10px')
    .style('display', 'none')
    .style('border-radius', '5px')
    .attr("id", "tooltip")

    // Add two divs in it for the text to add
    tooltip.append('div')
      .classed('gdp',true)
    tooltip.append('div')
      .classed('year',true)

    /////////////  Create d3 element and add data to it //////////////////
    // Chart size setup
    let chart = d3.select(".chart")
    .append("svg")
    .attr("width", widthOfSvg + margin.right + margin.left)
    .attr("height", heightOfSvg + margin.top + margin.bottom)
    .append('g') 
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Add data to chart
    chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .style('fill', (d,i) => color(i))
    .attr("width", xScaleBandwidth) //Bandwidth is the distance between two points
    .attr("x", (d,i) => xScale(i))
    .attr("height", 0)//d => heightOfSvg - yScale(d[1]))        // 
    .attr("y", heightOfSvg)//d => yScale(d[1]))   //heightOfSvg - d[1]/5)
    .classed("bar",true)
    //Add effect to tooltip when hover on
    .on('mouseover', function(d) { 
      // Get data
      let rect_data = d.target.__data__
      //Display tooltip
      tooltip.transition()
        .style('display', 'block')
        .style('opacity', 1)
      //Print data text to tooltip
      d3.select('.tooltip .gdp')
        .html(() => '$' + rect_data[1] + ' Billion')
        .style('font-size', '1.2em')
        .style('font-weight', 'bold')
      d3.select('.tooltip .year').html(() => {
        const date = rect_data[0].split('-')
        return months[parseInt(date[1])-1] + ' ' + date[0]
      })
      // Orient tooltip
      tooltip
        .style('left', (d.pageX - 145) + 'px') // can use: screenX, pageX, layerX, clientX or x
        .style('top', (d.pageY - 45) + 'px')
      //Save temporary color
      tempColor = this.style.fill
      //Set new color of rect
      d3.select(this)
        .style('opacity', 0.5)
        .style('fill','yellow')
    })
    
    //Add effect to tooltip when hover off
    .on('mouseout', function(d) {
      // Remove tooltip
      tooltip.transition()
        .style('display','none')
      // Change color of rect back to normal
      d3.select(this)
        .style('opacity',1)
        .style('fill', tempColor)
    })
    // Add elastic transition effect to the chart
    .transition()
      .attr("height", (d,i) => heightOfSvg - yScale(d[1]))
      .attr('y', d => yScale(d[1]))
      .delay((d, i) => i * 5)
      .duration(1000)
      .ease(d3.easeElastic)

    chart.append("g")
      .attr("transform", "translate(0, " + (heightOfSvg) +")")
      .classed('axis', true)
      .attr('id','x-axis')
      .call(xAxis)
    chart.append("g")
      .attr("transform", "translate(" + (0) +", 0)")
      .classed('axis', true)
      .attr('id','y-axis')
      .call(yAxis);

    let gdpText = d3.select('svg')
      .append('text')
        .classed('gdpText', true)
        .text('GDP, Billions of US Dollars')
        .attr('transform', 'translate(' + (margin.left + 20) + ', ' + margin.top + ') rotate(-90)')
        .style('text-anchor', 'end')
  } catch (err) {
    console.log(err)
  }
}
getData();