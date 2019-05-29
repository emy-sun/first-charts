const dataOil = [{
  "name": "Russia",
  "data": [531.0, 534.1, 540.7, 547.5, 546.7]
},
{
  "name": "Saudi Arabia",
  "data": [538.4, 543.4, 568.5, 516.7, 494.7]
},
{
  "name": "USA",
  "data": [448.5, 519.9, 567.2, 439.7, 458.2]
},
{
  "name": "Iraq",
  "data": [440.4, 498.8, 510.2, 399.6, 402.4]
}
]

const colorsPalette = ["#2D0035", "#D62828", "#F77F00", "#47D1ED"];

const sumOilBar = dataOil.map(item => {
const newObj = {};
newObj["name"] = item["name"];
newObj["data"] = [item["data"].reduce((acc, value) => acc + value)];
return newObj;
});

const sumOilPie = dataOil.map(item => {
const newObj = {};
newObj["name"] = item["name"];
newObj["y"] = item["data"].reduce((acc, value) => acc + value);
return newObj;
})

const extendDataWithColors = (data, colors) => {
const dataWithColors = data.map((item, index) => {
  const newObj = Object.assign(item, {
    "color": colors[index]
  });
  return newObj;
});
return dataWithColors;
}

Highcharts.chart('js_container1', {
chart: {
  backgroundColor: 'transparent',
  spacingLeft: 0,
},
title: {
  text: 'Volumes of oil production',
  margin: 15,
  style: {
    font: "16px 'Open Sans', sans-serif",
  }
},
tooltip: {
  headerFormat: `<div style="margin-bottom: 5px">{point.key}</div>`,
  pointFormat: "<div style='color:{series.color}'>{series.name}: {point.y} Mt </div>",
  backgroundColor: null,
  borderWidth: 0,
  shadow: false,
  shared: true,
  crosshairs: true,
  useHTML: true,
},
credits: {
  enabled: false
},
yAxis: {
  title: {
    text: 'Mt',
    x: 3
  }
},
legend: {
  enabled: false
},
plotOptions: {
  series: {
    label: {
      connectorAllowed: false
    },
    pointStart: 2013
  }
},
series: extendDataWithColors(dataOil, colorsPalette),
});

Highcharts.chart('js_container3', {
chart: {
  type: 'bar',
  spacingLeft: 0,
  backgroundColor: 'transparent',
  style: {
    fontFamily: "'Open Sans', sans-serif"
  }
},
title: {
  text: 'The total amount of oil produced (Million tons)',
  style: {
    font: "16px 'Open Sans', sans-serif",
  }
},
plotOptions: {
  bar: {
    dataLabels: {
      useHTML: true,
      className: 'barLabels',
      enabled: true,
      verticalAlign: 'top',
      align: 'right',
      formatter() {  
        return `${this.series.name}: ${this.y}`
      },
    }
  }
},
credits: {
  enabled: false
},
xAxis: {
  categories: ['Country'],
  title: {
    text: null,
  },
  labels: {
    rotation: -90,
    x: -7
  },
},
yAxis: {
  min: 0,
  title: {
    text: 'Volumes of oil (Mt)'
  }
},
legend: {
  enabled: false
},
tooltip: {
  enabled: false
},
series: extendDataWithColors(sumOilBar, colorsPalette),
});

Highcharts.chart('js_container2', {
chart: {
  type: 'pie',
  backgroundColor: 'transparent',
  style: {
    fontFamily: "'Open Sans', sans-serif"
  }
},
title: {
  text: 'The total amount of oil produced (%)',
  margin: 5,
  style: {
    font: "16px 'Open Sans', sans-serif",
  }
},
credits: {
  enabled: false
},
tooltip: {
  enabled: false
},

plotOptions: {
  pie: {
    allowPointSelect: true,
    cursor: 'pointer',
    dataLabels: {
      useHTML: true,
      enabled: true,
      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      style: {
        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
      },
    }
  }
},
series: [{
  name: 'Volumes of oil: ',
  colorByPoint: true,
  data: extendDataWithColors(sumOilPie, colorsPalette)
}]
});


const chart = Highcharts.charts[0]
$legend = $('#legend');
$.each(chart.series, function(j, serie) {
$legend.append('<div class="item"><div class="symbol" style="background-color:' + serie.color + '"></div><div class="serieName" id="">' + serie.name + '</div></div>');
});

$('#legend .item').click(function() {
var inx = $(this).index(),
  points = Highcharts.charts.map((chart) => chart.series[inx])

points.forEach((point) => {
  if (point.visible)
    point.setVisible(false);
  else
    point.setVisible(true);
})
});
