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
const widthOfSvg = 2000;
const heightOfSvg = 300;
const padding = 60;
let url_data = []

async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Add title and description
    document.getElementsByClassName("title")[0].innerHTML = data["name"];
    document.getElementsByClassName("supbar")[0].innerHTML = data["description"];

    // Calculate parameters for the d3 element
    const widthOfSvgBar = Math.ceil(widthOfSvg / data.data.length);
    const dates = data.data.map((d) => new Date(d[0][0]))
    console.log(dates)
    console.log([d3.min(dates, d => d), d3.max(dates, d => d)])



    const xScale = d3.scaleBand()
      .domain(dates.map((d) => d))
      .range([padding, widthOfSvg-padding])

    const yScale = d3.scaleLinear()
      .domain([d3.min(data.data, (d) => d[1]), d3.max(data.data, (d) => d[1])])
      .range([heightOfSvg - padding, padding])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    console.log((data.data[0][0]))
    console.log(xScale(data.data[0][0]))
    console.log((data.data[0][1]))
    console.log(yScale(data.data[0][1]))

    // Create d3 element and add data to it
    const chart = d3.select(".chart")
    .append("svg")
    .attr("width", widthOfSvg)
    .attr("height", heightOfSvg)

    chart.selectAll("rect")
    .data(data.data)
    .enter()
    .append("rect")
    .attr("x", (d,i) => i * 10)
    .attr("y", d => yScale(d[1]))//heightOfSvg - d[1]/5)
    .attr("width", widthOfSvgBar)
    .attr("height", d => d[1]*30)
    .attr("fill", "white")
    .attr("class", "bar")

    chart.append("g")
      .attr("transform", "translate(0," + (heightOfSvg - padding) + ")")
      .call(xAxis)

    chart.append("g")
    .attr("transform", "translate(" + (padding) + ",0)")
    .call(yAxis)

    //console.log(data.data)
  } catch (err) {
    console.log(err)
  }
}
getData();