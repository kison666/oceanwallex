var chart;
var chartId;
export var drawHistoryKLine = function(mData, color, chartId) {
    var dataArray = [];
    chartId = chartId; 
    var initData = function() {
        dataArray = mData;
        if (mData != null) {
            for (var i = 0; i < mData.length; i++) {
                dataArray[i][0] = mData[i][0] * 1000;
                dataArray[i][1] = parseFloat(mData[i][1]);
                // console.log(Highcharts.dateFormat('%m-%d', dataArray[i][0]));
            }
        }
    };

    //参数实例化
    Highcharts.setOptions({ global: { useUTC: false } });

    var drawLineChart = function() {
        chart = new Highcharts.StockChart(chartId, {
            chart: {
                type: 'line',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            title: {
                text: ''
            },
            rangeSelector: {
                enabled: false,
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    //tickInterval: 5 * 24 * 3600 * 1000,
                    style: {
                        color: '#999999', //颜色
                        fontSize: '13px', //字体
                        fontFamily: '微软雅黑'
                    },
                    formatter: function() {
                        return Highcharts.dateFormat('%m-%d', this.value);
                    },
                    // step: 1,
                },
                tickLength: 0, //X轴下标长度
                lineColor: '#cccccc',
                lineWidth: 1,
            },
            yAxis: {
                height: '100%',
                lineWidth: 1, //Y轴边缘线条粗细
                lineColor: '#cccccc', //Y轴边缘线条颜色
                gridLineColor: '#343434',
                gridLineWidth: 0.1,
                // gridLineDashStyle: 'longdash',
                opposite: false,
                labels: {
                    style: {
                        color: '#999999', //颜色
                        fontSize: '13px', //字体
                        fontFamily: '微软雅黑'
                    },
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            plotOptions: {
                line: {
                    color: color,
                }
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            tooltip: {
                style: { // 文字内容相关样式
                    fontFamily: "微软雅黑"
                },
                formatter: function() {
                    return '<b>' + 'date:' + '</b>' +
                        Highcharts.dateFormat('%Y-%m-%d', this.x) + '<br/>' +
                        '<b>' + 'exchange rate:' + '</b>' + this.y;
                }
            },
            series: [{
                type: 'line',
                name: '',
                data: dataArray
            }]
        });
    };
    initData();
    drawLineChart();
}

export var reDrawChart = function(data,divId) {
        if(divId==chartId){
           chart.series[0].setData(data); 
       }           
}