// Get api data
  // use fetch and display with console log
// make api data accessible in JS script
// build html element with svg 
  // have overall layer
  // Title
  // d3
  // undertitle
// link that element to div in html
// style stuff with css 


const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
const margin = {top: 10, right: 10, bottom: 20, left: 60}
const widthOfSvg = 1050 - margin.right - margin.left,
heightOfSvg = 600*.6 - margin.top - margin.bottom;
const padding = 60;
let url_data = []

async function getData() {
  try {
    const response = await fetch(url);
    const allData = await response.json()
    const data = allData.data;
    // Add title and description
    document.getElementsByClassName("title")[0].innerHTML = allData["name"];
    document.getElementsByClassName("supbar")[0].innerHTML = allData["description"];

    // Calculate parameters for the d3 element
    const xScale = d3.scaleBand()
      .domain(d3.range(0, data.length))
      .range([0, widthOfSvg])

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([0, heightOfSvg])

    const color = d3.scaleLinear()
      .domain([0, data.length*.33, data.length*.66, data.length])
      .range(['#B58929', '#C61C6F', '#268BD2', '#85992C'])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    let tempColor; // Temporary color holder, when mouse hovers over d3 element

    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

    console.log(xScale(2))
    console.log(xScale.bandwidth())
    console.log('transform', 'translate(0,' + margin.top + ',0,' + margin.bottom + ')')


    //////////////// Create tooltip - the pop up message when you hover //////////////////
    let tooltip = d3.select('.chart')
    .append('div')
    .classed('tooltip', true)
    .style('position', 'absolute')
    .style('padding', '2px 10px')
    .style('display', 'none')
    .style('border-radius', '5px')

    // Add two divs in it for the text to add
    tooltip.append('div')
      .classed('gdp',true)
    tooltip.append('div')
      .classed('year',true)

    ///////////// Create d3 element and add data to it //////////////////
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
    .attr("width", xScale.bandwidth()) //Bandwidth is the distance between two points
    .attr("x", (d,i) => xScale(i))
    .attr("height", d => yScale(d[1]))
    .attr("y", d => heightOfSvg-yScale(d[1]))//heightOfSvg - d[1]/5)
    //Add effect to tooltip when hover on
    .on('mouseover', function(d) { 
      // Get data
      rect_data = d.target.__data__
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
        .style('left', (d.pageX - 125) + 'px') // can use: screenX, pageX, layerX, clientX or x
        .style('top', (d.pageY - 75) + 'px')
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

    

    chart.transition()
      .delay((d,i) => i*5)
      .duration(2000)
      .ease(d3.easeElastic)
      // .attr('height', d => yScale(d[1]))
      // .attr("y", d => heightOfSvg-yScale(d[1]))
      

    // chart.append("g")
    //   .attr("transform", "translate(0," + (heightOfSvg - padding) + ")")
    //   .call(xAxis)

    // chart.append("g")
    // .attr("transform", "translate(" + (padding) + ",0)")
    // .call(yAxis)

    //console.log(data)
  } catch (err) {
    console.log(err)
  }
}
getData();