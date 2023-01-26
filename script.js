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
let url_data = []

// document.addEventListener('DOMContentLoaded', function(){
  
// });
getData();

async function getData() {
  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("title").innerText = data["name"];
  document.getElementById("supbar").innerText = data["description"];
  console.log(data)
}

// const response = fetch(url) 
//   .then((response) => response.json())
//   .then((data) => {
//     url_data = data;
//   });



// console.log(response)
// console.log(url_data)
// let data = jsonData.data;
// console.log(data[1][1]);


// const widthOfSvgBar = Math.ceil(widthOfSvg / data.length);
// console.log(widthOfSvgBar);

// // This is how d3 lets you update the document
// d3.select(".title")
//   .append("text")
//   .text(jsonData.name);

// // This is how d3 lets you update the document
// d3.select(".undertitle")
//   .append("text")
//   .text(jsonData.description);

// const chart = d3.select(".chart")
//   .append("svg")
//   .attr("width", widthOfSvg)
//   .attr("height", heightOfSvg);

//   chart.selectAll("rect")
//   .data(data)
//   .enter()
//   .append("rect")
//   .attr("x", (d,i) => i * 10)
//   .attr("y", d => heightOfSvg-d[1]/30)
//   .attr("width", widthOfSvgBar)
//   .attr("height", d => d[1])

  
// svg.selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("x", (d, i) => i * 30)
//   .attr("y", (d, i) => h - 3 * d)
//   .attr("width", 25)
//   .attr("height", (d, i) => d * 3)
//   .attr("fill", "navy")
//   .attr("class", "bar")
// // Add your code below this line
//   .append("title")
//   .text(d => d)

// // Add your code above this line

// svg.selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text((d) => d)
//   .attr("x", (d, i) => i * 30)
//   .attr("y", (d, i) => h - (d * 3 + 3))