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
    borderColor: '#B8B9B0',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'transparent',
    spacingLeft: 0,
  },
  title: {
    text: 'Volumes of oil production in Russia, USA and Saudi Arabia for 2013 - 2017',
    margin: 15,
    style: {
      font: "16px 'Open Sans', sans-serif",
    }
  },
  tooltip: {
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
    borderColor: '#B8B9B0',
    borderWidth: 1,
    borderRadius: 2,
    type: 'bar',
    spacingLeft: 7,
    style: {
      fontFamily: "'Open Sans', sans-serif"
    }
  },
  title: {
    text: 'The total amount of oil produced in Russia, USA and Saudi Arabia for 2013 - 2017',
    style: {
      font: "16px 'Open Sans', sans-serif",
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
      x: -5
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
    valueSuffix: ' Mt'
  },
  series: extendDataWithColors(sumOilBar, colorsPalette),
});

Highcharts.chart('js_container2', {
  chart: {
    borderColor: '#B8B9B0',
    borderWidth: 1,
    borderRadius: 2,
    type: 'pie',
    style: {
      fontFamily: "'Open Sans', sans-serif"
    }
  },
  title: {
    text: 'The total amount of oil produced in Russia, USA and Saudi Arabia for 2013 - 2017',
    margin: 5,
    style: {
      font: "16px 'Open Sans', sans-serif",
    }
  },
  credits: {
    enabled: false
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
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
