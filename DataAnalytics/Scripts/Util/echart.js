<script src="Scripts/jquery-3.3.1.js"></script>
<script src="Scripts/Util/Detail.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>

  //      var dom = document.getElementById("container");//<div id="container" style="height: 100%"></div>
var myChart1 = echarts.init(dom);
window.currentPortfolio = ViewBag.portfolio;
//var mychart2 = echarts.init(dom);
// var app = {};


function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns = [];
    var close = [];
    var test = [];
    var test2 = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumns.push(rawData[i][4]);
        close.push(rawData[i][1]);
        test.push(rawData[i][2]);
        test2.push(rawData[i][3] - 2)
    }
    return {
        categoryData: categoryData,
        values: values,
        volumns: volumns,
        close: close,
        test: test,
        test2: test2
    };
}


function updateEchartBase(data) {
    if (!myChart1) {
        return;
    }
    var option = myChart1.getOption()
    inimodel1.data = data.obj[0].values;
    inimodel2.data = data.obj[0].close;
    inimodel3.data = data.obj[0].volumns;
    option.series.push(inimodel1, inimodel2, inimodel3)
    option.xAxis[0].data = data.obj[0].categoryData;
    option.xAxis[0].data = data.obj[1].categoryData;
    myChart1.setOption(option);
}

function addEchartSymbol(data) {
    var option = myChart1.getOption()
    for (var i = 1; i < length(data.obj); i++) {
        addmodel.data = data.obj[i].close;
        option.series.push(addmodel.data)
    }
    myChart1.setOption(option);
}

function addEchartSymbol_2(data) {
    var option = myChart1.getOption()
    for (var i = 0; i < length(data.obj); i++) {
        addmodel.data = data.obj[i].close;
        option.series.push(addmodel.data)
    }
    myChart1.setOption(option);
}


function initData(_from, _to, _split, _symbols) {
    
    var addmodel = {
        name: "close",
        type: 'line',
        data: [],
        smooth: true,
        lineStyle: {
            normal: { opacity: 0.5 }
        },
    };
    var inimodel1 = {
        name: 'D43index',
        type: 'candlestick',
        data: [],
        itemStyle: {
            normal: {
                color: '#06B800',
                color0: '#FA0000',
                borderColor: null,
                borderColor0: null
            },
        },

    };
    var inimodel2 = {
        name: "close",
        type: 'line',
        data: [],
        smooth: true,
        lineStyle: {
            normal: { opacity: 0.5 }
        },
        tooltip: { show: false }
    };

    var inimodel3 = {

        name: 'Volumn',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: []
    };
    var option = {
        backgroundColor: '#eee',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index']
        },
        axisPointer: {
            link: { xAxisIndex: 'all' },
            label: {
                backgroundColor: '#777'
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },
        grid: [
            {
                left: '10%',
                right: '8%',
                height: '50%'
            },
            {
                left: '10%',
                right: '8%',
                bottom: '20%',
                height: '15%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: [],
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    z: 100
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: [],
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            var seriesValue = (params.seriesData[0] || {}).value;
                            return params.value
                                + (seriesValue != null
                                    ? '\n' + echarts.format.addCommas(seriesValue)
                                    : ''
                                );
                        }
                    }
                }
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 98,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '85%',
                start: 98,
                end: 100
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
    }
    myChart1.setOption(option)
    data = readPortfolioDetail(_from, _to, _split, _symbols);
    updateEchartBase(data);
    addEchartSymbol(data);
}

function addData(symbol) {
    window.currentPortfolio.symbols.push(symbol)
    data = readPortfolioDetail(window.currentPortfolio.from, window.currentPortfolio.to, window.currentPortfolio.split, window.currentPortfolio.symbols[length(window.currentPortfolio.symbols) - 1]);
    addEchartSymbol_2(data);
}

