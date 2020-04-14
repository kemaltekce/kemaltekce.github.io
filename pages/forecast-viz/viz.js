// load data
function get_weekend(d) {
  if (d.weekday == 0 || d.weekday == 6) {
    return 1
  } else {
    return 0}
  }

d3.csv("./bikesharing.csv")
  .then(function (csv) {
    let data = csv
      .slice(0, 400)
      .map(function(d) {
        return {
          datetime: d.datetime,
          target: d.count,
          workingday: d.workingday,
          holiday: d.holiday
        }
      })

data.forEach(d => {
  d.target = +d.target;
  d.datetime = new Date(d.datetime)
  d.workingday = +d.workingday
  // XXX: create dummy predictions until you add real predicitons
  d.prediction = +d.target + Math.floor((Math.random() - 0.5) * 50)
  d.error = d.prediction - d.target
  d.weekday = new Date(d.datetime).getDay()
  d.weekend = get_weekend(d)
  d.holiday = +d.holiday
});

const windowWidth = Math.min(window.innerWidth, 800)
const windowHeight = 300

d3.select("svg.main")
  .attr('width', windowWidth)
  .attr('height', windowHeight)
d3.select("svg.focus")
  .attr('width', windowWidth)
  .attr('height', windowHeight)
d3.select("svg.buttons")
  .attr('width', windowWidth)
  .attr('height', 100)

// add margin for axis
let margin
if (windowWidth < 400) {
  margin = {top: 0, right: 30, bottom: 50, left: 0};
} else {
  margin = {top: 0, right: 50, bottom: 50, left: 50};
}
const height = windowHeight - margin.top - margin.bottom;
const width = windowWidth - margin.left - margin.right;

// parameters
const lineChartHeight = height * 0.3
const rectHeight = lineChartHeight * 0.7
const errorplotHeight = height * 0.5
const xAxisHeight = height * 0.58
const hLineHeight = {'workingday': height * 0.8, 'holiday': height * 0.9}


// focus plot if brushed is larger than margin. Thus clip away chart.
var clip = d3.select("svg.main").append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("width", width)
  .attr("height", height)
  .attr("x", 0)
  .attr("y", 0);

// scale
var timeScale = d3.scalePoint().range([0, width]),
  focusTimeScale = d3.scalePoint().range([0, width]),
  targetScale = d3.scaleLinear().range([lineChartHeight, 0]),
  focusTargetScale = d3.scaleLinear().range([lineChartHeight, 0]);

const targetMinMax = d3.extent(data, d => d.target)
const predMinMax = d3.extent(data, d => d.prediction)
const yMinMax = [
  Math.min(targetMinMax[0], predMinMax[0]),
  Math.max(targetMinMax[1], predMinMax[1])]

var timeArray = [];
for(var i = 0; i < data.length; i++){
timeArray.push(data[i].datetime);
}
timeScale.domain(timeArray);
targetScale.domain(yMinMax);
focusTimeScale.domain(timeScale.domain());
focusTargetScale.domain(targetScale.domain());

// Chart groups
var mainChart = d3.select("svg.main").append('g')
  .attr('class', 'mainChart')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

var focusChart = d3.select("svg.focus").append('g')
  .attr('class', 'focusChart')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)
  .attr("clip-path", "url(#clip)");

// draw rects
rectGenerator(mainChart.append('g'),
  { data, timeScale, rectHeight, lineChartHeight })
rectGenerator(focusChart.append('g'),
  { data, timeScale: focusTimeScale, rectHeight, lineChartHeight })

// draw lines
generateLine(mainChart, {data, line, column: 'target'})
generateLine(mainChart, {data, line, column: 'prediction'})
generateLine(mainChart, {data, line, column: 'error'})
generateLine(focusChart, {data, line: focusLine, column: 'target'})
generateLine(focusChart, {data, line: focusLine, column: 'prediction'})
generateLine(focusChart, {data, line: focusLine, column: 'error'})
d3.select("svg.main").select('.line-error')
  .attr('transform', `translate(0, ${errorplotHeight - lineChartHeight})`)
d3.select("svg.focus").select('.line-error')
  .attr('transform', `translate(0, ${errorplotHeight - lineChartHeight})`)

// xAxis
var ticksAmount = 5
const xAxisMain = d3.axisBottom(timeScale)
  .tickValues(timeScale.domain().filter(
  (d, i) => (i + 1) % Math.floor(timeArray.length / ticksAmount) == 0))
  .tickSizeOuter(0)
var xAxisFocus = d3.axisBottom(focusTimeScale)
  .tickValues(focusTimeScale.domain().filter(
  (d, i) => (i + 1) % Math.floor(timeArray.length / ticksAmount) == 0))
  .tickSizeOuter(0)
mainChart.append('g')
  .attr('class', 'xAxis-main')
  .attr('transform', `translate(0, ${xAxisHeight})`)
  .call(xAxisMain)
  .attr('color', 'grey')
  .attr('stroke-width', 1.5)
  .attr('font-size', 12);
focusChart.append('g')
  .attr('class', 'xAxis-focus')
  .attr('transform', `translate(0, ${xAxisHeight})`)
  .call(xAxisFocus)
  .attr('color', 'grey')
  .attr('stroke-width', 1.5)
  .attr('font-size', 12);
focusChart.selectAll('.xAxis-focus .tick text').each(insertLinebreaks);
mainChart.selectAll('.xAxis-main .tick text').each(insertLinebreaks);

// draw additional horizontal line info
let hLineMain
let hLineFocus
hLineElements = ['workingday', 'holiday']
for (var i = 0; i < hLineElements.length; i++) {
  hLineMain = mainChart.append('g')
  hLineFocus = focusChart.append('g')
  horizontalLineGenerator(hLineMain, {
    data, width, timeScale, column: hLineElements[i] })
  horizontalLineGenerator(hLineFocus, {
    data, width, timeScale: focusTimeScale, column: hLineElements[i] })
  hLineMain
      .attr('transform', `translate(0, ${hLineHeight[hLineElements[i]]})`);
  hLineFocus
      .attr('transform', `translate(0, ${hLineHeight[hLineElements[i]]})`);
}

// add brush
var brush = d3.brushX()
  .extent([[0, -5], [width, lineChartHeight + 5]])
  .on("brush end", brushed);

mainChart.append("g")
  .attr("class", "brush")
  .call(brush);

//// functions ////
function insertLinebreaks(d) {
  var el = d3.select(this);
  var pad = "00"

  var day = "" + d.getDate()
  day = pad.substring(0, pad.length - day.length) + day
  var month = String(parseInt(d.getMonth()) + 1)
  month = pad.substring(0, pad.length - month.length) + month
  var year = d.getFullYear()
  var hour = "" + d.getHours()
  hour = pad.substring(0, pad.length - hour.length) + hour
  var minute = "" + d.getMinutes()
  minute = pad.substring(0, pad.length - minute.length) + minute

  el.text('');
  var tspan = el.append('tspan').text(year + '-' + month + '-' + day);
  var tspan = el.append('tspan').text(hour + ':' + minute)
  .attr('x', 0).attr('dy', '15');
};

function line(column) {
  return d3.line()
    .x(d => timeScale(d.datetime))
    .y(d => targetScale(d[column]))
}

function focusLine(column) {
  return d3.line()
    .x(d => focusTimeScale(d.datetime))
    .y(d => focusTargetScale(d[column]))
}

function generateLine(selection, args) {
  const {data, line, column} = args
  const colorScale = d3.scaleOrdinal()
    .domain(['target', 'prediction', 'error'])
    .range(['#688BAB', '#E25A42', '#95A17E']);
  selection.append("path")
    .datum(data)
    .attr("class", "line-" + column)
    .attr("d", line(column))
    .attr('fill', 'None')
    .attr('stroke', colorScale(column))
    .attr('stroke-width', 3)
    .attr('stroke-linejoin', 'round');
}

function rectGenerator(selection, args){
  const { data, timeScale, rectHeight, lineChartHeight } = args
  const colorScale = d3.scaleOrdinal()
    .domain(d3.extent(data, d => d.weekend))
    .range(['#f8ba91', '#635F5D']);
  const weekendWidth = timeScale.step()

  selection.selectAll(".rect-weekend")
    .data(data)
    .enter().append("rect")
      .attr("class", "rect-weekend")
      .attr('height', rectHeight)
      .attr('width', weekendWidth)
      .attr('stroke-width', 1)
      .attr('x', d => timeScale(d.datetime) - weekendWidth / 2)
      .attr('y', (lineChartHeight - rectHeight) / 2)
      .attr('fill', d => colorScale(d.weekend))
      .attr('stroke', d => colorScale(d.weekend))
}

function horizontalLineGenerator(selection, args) {
  const { data, width, timeScale, column } = args
  const height = 3

  const offset = timeScale.step() / 2
  selection.append('line')
    .attr('x1', -offset)
    .attr('y1', 0)
    .attr('x2', width - offset)
    .attr('y2', 0)
    .attr('stroke-width', 1.5)
    .attr('stroke', 'grey')

  const heightScale = d3.scaleOrdinal()
    .domain(d3.extent(data, d => d[column]))
    .range([0, height]);
  selection.selectAll('.hLine-' + column)
    .data(data)
    .enter().append('rect')
      .attr('class', 'hLine-' + column)
      .attr('x', d => timeScale(d.datetime) - offset)
      .attr('y', -height / 2)
      .attr('height', d => heightScale(d[column]))
      .attr('width', offset * 2)
      .attr('fill', 'grey')
      .attr('stroke', 'grey')
      .attr('stroke-width', 1)

  selection.append('text')
    .attr('fill', 'grey')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .text(column)
    .attr('transform', `translate(${0}, ${-4})`)
}

function invertPointScale(x, scale) {
  var range = scale.range()
  var domain = scale.domain()
  var rangePoints = d3.range(range[0], range[1], scale.step())
  var xInv = domain[d3.bisect(rangePoints, x) - 1]
  return xInv
}

function update(data, array) {
  // unfilter lines
  focusChart.select(".line-target")
    .datum(data)
    .attr("d", focusLine('target'))
  focusChart.select(".line-prediction")
    .datum(data)
    .attr("d", focusLine('prediction'))
  focusChart.select(".line-error")
    .datum(data)
    .attr("d", focusLine('error'))

  // calculate offset
  const offset = focusTimeScale.step() / 2;
  function calculateWidth(d){
    if (isNaN(focusTimeScale(d.datetime))) {return 0}
    else {return offset * 2}
  }

  // update weekend rects
  focusChart.selectAll(".rect-weekend")
    .attr("x", d => focusTimeScale(d.datetime) - offset)
    .attr('width', d => calculateWidth(d));

  // update x axis
  xAxisFocus = d3.axisBottom(focusTimeScale)
    .tickValues(focusTimeScale.domain().filter(
    (d, i) => (i + 1) % Math.floor(array.length / ticksAmount) == 0))
    .tickSizeOuter(0)
  focusChart.select('.xAxis-focus').call(xAxisFocus)

  // update horizontal line info
  focusChart.selectAll('.hLine-workingday')
    .attr('x', d => focusTimeScale(d.datetime) - offset)
    .attr('width', d => calculateWidth(d));
  focusChart.selectAll('.hLine-holiday')
    .attr('x', d => focusTimeScale(d.datetime) - offset)
    .attr('width', d => calculateWidth(d));

  // axis
  focusChart.selectAll('.xAxis-focus .tick text').each(insertLinebreaks);
}

var dataAll = data
var timeArray_
function brushed() {
  var s = d3.event.selection || timeScale.range();

  var focusDates = [
  invertPointScale(s[0], timeScale),
  invertPointScale(s[1], timeScale)]
  timeArray_ = []
  for (var i = 0; i < dataAll.length; i++){
  if (focusDates[0] <= dataAll[i].datetime & dataAll[i].datetime <= focusDates[1]) {
    timeArray_.push(dataAll[i].datetime);
  }
  }
  data = dataAll.filter(function(d) {
    return (d.datetime <= focusDates[1] && d.datetime >= focusDates[0])
  })
  focusTimeScale.domain(timeArray_)

  update(data, timeArray_)
}

//// buttons ////
var buttonChart = d3.select("svg.buttons").append('g')
  .attr('class', 'buttonChart')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)
var buttonWidth = (windowWidth - margin.right - margin.left - 60) / 7
var buttonHeight = 30

if (windowWidth < 750) {
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
} else {
  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}
var buttonData = []
for (var i = 0; i < weekdays.length; i++) {
  var element = {}
  element.nr = i
  element.name = weekdays[i]
  buttonData.push(element)
}

var currentClick
var lastClick = ""
var currentColor = "#f8ba91"
function filterData(d) {
  var dayType = d.nr;
  var dataAllTemp = data
  currentClick = d.name
  // change button color
  currentColor = d3.select(this).attr("fill")
  currentColor = currentColor == "#f8ba91" ? "#635F5D" : "#f8ba91";
  d3.select(this).attr("fill", currentColor);

  if (currentClick != lastClick) {
  if (lastClick != "") {
    console.log(".filter_button_" + lastClick)
    buttonChart.select(".filter_button_" + lastClick).select("rect").attr("fill", "green")
  }

  data = data.filter(d => d.weekday == dayType)
  // adjust scale
  var timeArrayFiltered = [];
  for(var i = 0; i < data.length; i++){
    timeArrayFiltered.push(data[i].datetime);
  }
  focusTimeScale.domain(timeArrayFiltered)
  update(data, timeArrayFiltered)
  data = dataAllTemp
  lastClick = currentClick

  } else {
  // adjust scale
  if (timeArray_ && timeArray_.length) {
    focusTimeScale.domain(timeArray_)
    update(data, timeArray_)
  } else {
    focusTimeScale.domain(timeArray)
    update(data, timeArray)
  }
  lastClick = ""
  }
}

var button = buttonChart.selectAll("g")
  .data(buttonData)
  .enter().append("g")
  .attr("class", d => "filter_button_" + d.name)
  .attr("cursor", "pointer")
  .attr("transform", (d, i) => "translate(" + (i * buttonWidth + i * 10) + ",0)")

button.append("rect")
  .attr("width", buttonWidth)
  .attr("height", buttonHeight)
  .attr("rx", 1)
  .attr("ry", 1)
  .attr("fill", currentColor)
  .on("click", filterData);

button.append("text")
  .attr("dy", (buttonHeight / 2 + 3))
  .attr("dx", buttonWidth / 2)
  .attr('fill', 'white')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 15)
  .style("text-anchor", "middle")
  .text(d => d.name)
  .attr("pointer-events", "None");

//// mouseover ////
function createHoverInfo(date) {
  var el = d3.select(".mouse-text");
  var pad = "00"
  var values = data.filter(d => d.datetime == date)[0]

  var day = "" + date.getDate()
  day = pad.substring(0, pad.length - day.length) + day
  var month = String(parseInt(date.getMonth()) + 1)
  month = pad.substring(0, pad.length - month.length) + month
  var year = date.getFullYear()
  var hour = "" + date.getHours()
  hour = pad.substring(0, pad.length - hour.length) + hour
  var minute = "" + date.getMinutes()
  minute = pad.substring(0, pad.length - minute.length) + minute

  el.text('');
  var tspan = el.append('tspan').text(year + '-' + month + '-' + day + '  ' + hour + ':' + minute);
  list = ['target', 'prediction', 'error', 'workingday', 'holiday']
  for (var i = 0; i < list.length; i++) {
    var tspan = el.append('tspan').text(list[i] + ': ' + values[list[i]])
      .attr('x', 0).attr('dy', '15');
  }

  el
    .attr('fill', '#635F5D')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
};

var mouseG = focusChart.append("g")
  .attr("class", "mouse-over-effects");

mouseG.append("path") // this is the black vertical line to follow mouse
  .attr("class", "mouse-line")
  .style("stroke", "#635F5D")
  .style("stroke-width", "1px")
  .style("opacity", "0");

mouseG.append("g")
  .attr("class", "mouse-text-group")

d3.select(".mouse-text-group")
  .append("rect")
  .attr("width", 105)
  .attr("height", 95)
  .attr("rx", 1)
  .attr("ry", 1)
  .attr("fill", '#f8ba91')
  .attr("opacity", "0")

d3.select(".mouse-text-group")
  .append("text")
  .attr("class", "mouse-text");

mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
  .attr('width', width) // can't catch mouse events on a g element
  .attr('height', height)
  .attr('fill', 'none')
  .attr('pointer-events', 'all')
  .on('mouseout', function() { // on mouse out hide line, circles and text
    d3.select(".mouse-line")
      .style("opacity", "0");
    d3.select(".mouse-text")
      .style("opacity", "0");
    d3.select(".mouse-text-group rect")
      .style("opacity", "0");
  })
  .on('mouseover', function() { // on mouse in show line, circles and text
    d3.select(".mouse-line")
      .style("opacity", "1");
    d3.select(".mouse-text")
      .style("opacity", "1");
      d3.select(".mouse-text-group rect")
      .style("opacity", "0.8");
  })
  .on('mousemove', function() { // mouse moving over canvas
    var mouse = d3.mouse(this);
    d3.select(".mouse-line")
      .attr("d", function() {
        var d = "M" + mouse[0] + "," + height;
        d += " " + mouse[0] + "," + 0;
        return d;
    })
    d3.select(".mouse-text-group rect")
      .attr("transform", `translate(${mouse[0] + 10}, ${mouse[1]})`)
    d3.select(".mouse-text")
      .attr("transform", `translate(${mouse[0] + 15}, ${mouse[1] + 15})`)
    createHoverInfo(invertPointScale(mouse[0], focusTimeScale))

    if (mouse[0] > width / 2) {
      hoverWidth = +d3.select(".mouse-text-group rect").attr('width')
      d3.select(".mouse-text-group rect")
        .attr("transform", `translate(${mouse[0] - 10 - hoverWidth}, ${mouse[1]})`)
      d3.select(".mouse-text")
        .attr("transform", `translate(${mouse[0] - 5 - hoverWidth}, ${mouse[1] + 15})`)
    }
  })
});
