function render(data) {
  data = data.filter(function(d){ return d.city == "Stadt Münster" })
  data.reverse()
  // fix missing values
  for(var i = 1; i < data.length; i++){
    if (data[i-1].recovered != 0) {
      if (data[i].recovered == 0) {data[i].recovered = data[i-1].recovered}
      if (data[i].death == 0) {data[i].death = data[i-1].death}
    }
  }
  // new infections
  for(var i = 1; i < data.length; i++){
    data[i].newInfected = data[i].infected - data[i-1].infected
  }
  // calculate current amount of infected people
  data.forEach(d => {
    d.infected = d.infected - d.recovered - d.death - d.newInfected
  });

  // columns
  var cols = ['infected', 'newInfected', 'recovered', 'death']

  // transpose data
  var stack = d3.stack()
    .keys(cols)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone)
  var dataset = stack(data)

  // define width and height of svg
  const windowWidth = Math.min(window.innerWidth, 800)
  const windowHeight = 400

  d3.select("svg.main")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${windowWidth} ${windowHeight}`)
    // .attr('width', windowWidth)
    // .attr('height', windowHeight)
  // add margin for axis
  const margin = {top: 0, right: 50, bottom: 80, left: 50};
  const height = windowHeight - margin.top - margin.bottom;
  const width = windowWidth - margin.left - margin.right;

  // define main body
  var body = d3.select('svg.main').append('g')
    .attr('class', 'body')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // define scales
  const xScale = d3.scaleBand()
    .domain(data.map(function(d) { return d.date; } ))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d3.max(d, d => d[1]))])
    .range([height, 0]);

  const heightScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d3.max(d, d => d[1]))])
    .range([0, height]);

  var colors = ['#E25A42', '#BD2D28', '#6BBBA1', '#7C715E']
  const color = d3.scaleOrdinal()
    .domain(cols)
    .range(colors);

  // create axis
  const axis = d3.axisBottom(xScale)
  if (windowWidth < 800) {
  axis.tickValues(xScale.domain().filter((d, i) => (i + 1) % 2 == 0))
  }
  const xAxis = body.append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0, ${height})`)
    .attr('color', '#8E8883')
    .call(axis.tickSizeOuter(0)
    );
  xAxis.selectAll('text')
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .attr("transform", "rotate(90)");

  const yAxis = body.append('g')
    .attr('id', 'yAxis')
    .attr('color', '#8E8883')
    .call(d3.axisLeft(yScale).tickSize(-width));
  yAxis.selectAll('.domain')
    .remove();

  // create group eleemnt for stacked bar plot
  const rects = body.selectAll('g.chart')
    .data(dataset).enter()
    .append('g')
    .attr('id', 'chart')
    .attr('fill', d => color(d.key));

  // create stacked bar plot
  var stackedBarY = function (d) { return yScale(d[1]); };
  var barHeight = function (d) { return heightScale(d[1] - d[0]); };
  var transitionStackedBars = function (selection) {
    selection.transition()
      .duration(400)
      .delay(function(d,i) {return(i*100)})
      .attr("y", stackedBarY)
      .attr("height", barHeight);
  };

  rects.selectAll('rect')
    .data(d => d)
    .join('rect')
    .attr('x', (d, i) => xScale(d.data.date))
    .attr('y', height)
    .attr('height', 0)
    .attr('width', xScale.bandwidth())
    .attr('opacity', '0.9')
    .call(transitionStackedBars);

  // hover
  function createHoverInfo(date) {
    var el = d3.select('.mouse-text');
    var values = data.filter(d => d.date == date)[0]

    el.text('');
    var tspan = el.append('tspan').text(date)
    var translation = ['infected', 'additional new infections', 'recovered', 'death']
    for (var i = 0; i < translation.length; i++) {
      el.append('tspan').text(translation[i] + ': ' + values[cols[i]])
        .attr('x', 0).attr('dy', '15');
    }
    var total = values['infected'] + values['recovered'] + values['death']
    el.append('tspan').text('total: ' + total)
      .attr('x', 0).attr('dy', '15');

    el
      .attr('fill', '#635F5D')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
  };
  function invertPointScale(x, scale) {
    var range = scale.range()
    var domain = scale.domain()
    var rangePoints = d3.range(range[0], range[1], scale.step())
    var xInv = domain[d3.bisect(rangePoints, x) - 1]
    return xInv
  }
  var mouseG = body.append('g')
    .attr('class', 'mouse-over-effects');
  mouseG.append('g')
    .attr('class', 'mouse-text-group');
  d3.select('.mouse-text-group')
    .append('rect')
    .attr('width', 170)
    .attr('height', 97)
    .attr('rx', 1)
    .attr('ry', 1)
    .attr('fill', '#f8ba91')
    .attr('opacity', '0')

  d3.select('.mouse-text-group')
    .append('text')
    .attr('class', 'mouse-text');

  mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() {
      d3.select('.mouse-text')
        .style('opacity', '0');
      d3.select('.mouse-text-group rect')
        .style('opacity', '0');
    })
    .on('mouseover', function() { // on mouse in show line, circles and text
      d3.select(".mouse-text")
        .style("opacity", "1");
      d3.select(".mouse-text-group rect")
        .style("opacity", "0.8");
    })
    .on('mousemove', function() {
      var mouse = d3.mouse(this);
      d3.select('.mouse-text-group rect')
        .attr('transform', `translate(${mouse[0] + 10}, ${mouse[1]})`)
      d3.select('.mouse-text')
        .attr('transform', `translate(${mouse[0] + 15}, ${mouse[1] + 15})`)
      createHoverInfo(invertPointScale(mouse[0], xScale))

      if (mouse[0] > width / 2) {
        var hoverWidth = +d3.select('.mouse-text-group rect').attr('width')
        d3.select('.mouse-text-group rect')
          .attr('transform', `translate(${mouse[0] - 10 - hoverWidth}, ${mouse[1]})`)
        d3.select('.mouse-text')
          .attr('transform', `translate(${mouse[0] - 5 - hoverWidth}, ${mouse[1] + 15})`)
      }
    })
}

//let link = "https://gist.githubusercontent.com/kemaltekce/52650b06a556276ad2f254add02dc46a/raw/68b299125f85793d22071804ac89331ca85ce851/covi19_muenster.csv"
let link = "https://raw.githubusercontent.com/od-ms/resources/master/coronavirus-fallzahlen-regierungsbezirk-muenster.csv"

function toDate(dateStr) {
  var parts = dateStr.split(".")
  return new Date(parts[2], parts[1] - 1, parts[0])
}

var dateFormat = d3.timeFormat('%d-%m-%Y')

let data = d3.csv(link, function(d){
  return {
    // city: d.city,
    // date: dateFormat(new Date(toDate(d.date))),
    // infected: +d.infected,
    // recovered: +d.recovered,
    // death: +d.death
    city: d.Gebiet,
    date: dateFormat(new Date(toDate(d.Datum))),
    infected: +d['Bestätigte Faelle'],
    recovered: +d.Gesundete,
    death: +d.Todesfaelle,
    newInfected: 0
  }
}).then(render)