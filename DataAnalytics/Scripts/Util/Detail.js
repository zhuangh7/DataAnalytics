//@{
//    ViewBag.Title = "Detail";
//    if(ViewBag.username == null && ViewBag.password == null) {
//        <script>
//            alert("please sign in first");
//            location.href = "/";
//        </script>
//    }
//}
/*
 * judge if sign in 
 */

function readSummary(symbol) {
    var form = new FormData();
    form.append("summary", symbol);

    $.ajax({
        type: "POST",
        url: "/home/readSummary",
        dataType: "json",
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        success: function (result) {
            console.log(result); //this result will be a signle json object which contain '''errmsg''' or '''data''' which contain a summary object
            if (result.errmsg != null) {
                alert('readDataError');
            } else {
                //get data from result.data
            }
        },
        error: function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        }
    });
    return false;
}

function readSymbols() {
    $.ajax({
        type: "POST",
        url: "/home/readSymbols",
        dataType: "json",
        success: function (result) {
            console.log(result); //this result will be a signle json object which contain '''errmsg''' or '''data''' which is a string[] of symbols
            if (result.errmsg != null) {
                alert('readDataError');
            } else {
                if (result.data) {
                    //save successfully
                    console.log(result.data);
                } else {
                    //fail to save
                    alert('error when read symbols');
                }
            }
        },
        error: function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        }
    });
    return false;
}

function saveCurrentPortfolio(_from,_to,_split,_symbols) {
    var samplePersonObject = {
        from: _from,
        to: _to,
        split: _split,
        symbols: _symbols//["symbol_1", "symbol_2"]
    };

    var jsonSerialized = JSON.stringify(samplePersonObject);

    $.ajax({
        type: "POST",
        url: "/home/savePortfolioDetail",
        dataType: "json",
        contentType: "application/json",
        data: jsonSerialized,
        success: function (result) {
            console.log(result); //this result will be a signle json object which contain '''errmsg''' or '''data''' which is a <<<bool>>> to tell you if save successfully
            if (result.errmsg != null) {
                alert('readDataError');
            } else {
                if (result.data) {
                    //save successfully
                } else {
                    //fail to save
                    alert('error when save portfolio, try again');
                }
            }
        },
        error: function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        }
    });
    return false;
}

function readPortfolioDetail(_from, _to, _split, _symbols) {
    var samplePersonObject = {
        from: _from,
        to: _to,
        split: _split,
        symbols: _symbols//["symbol_1", "symbol_2"]
    };

    var jsonSerialized = JSON.stringify(samplePersonObject);

    $.ajax({
        type: "POST",
        url: "/home/readPortfolioDetail",
        dataType: "json",
        contentType: "application/json",
        data: jsonSerialized,
        success: function (result) {
            console.log(result); //this result will be a signle json object which contain '''errmsg''' or '''data''' which is a object
            if (result.errmsg != null) {
                alert('readDataError');
            } else {
                //get data from result.data
            }
        },
        error: function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        }
    });
    return false;
}


var symbolList = ["hi", "nice", "well done", "haha"];
$(document).ready(function () {
    //load symbol list
    //TODO
    //symbolList=funtion()


    //load portfolio's item
    /* $('#portfolioTable').DataTable({
         "processing": true,
         "searching": true,
         //"serverSide": true,
         "ajax": {
             "url": "#",
         },
         "columns": [
             { "data": "open" },
             { "data": "close" },
             { "data": "high" },
             { "data": "low" }
         ]
     });*/
});
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// find symbol
//show symbol list
$(function () {
    //var availableTags = ["标缝路","诚信路","公诚路","万诚路","何寇路","何潘路","何新路","栎西路","房西路","文化东路","桃源东路","石家东路"];
    $("#input_find").autocomplete({
        source:
                function (request, response) {
                    var results = $.ui.autocomplete.filter(symbolList, request.term);
                    response(results.slice(0, 10));//只显示自动提示的前十条数据
                },
        messages: {
            noResults: '',
            results: function () { }
        },
    });

});

//add symbol btn 
$("#add_btn").click(
    function () {
        //call 
    }
)

//save portfolio
$("#save_portfolio").click(
    function () {
        $("#myModal").modal("show");
    }

);

//save portfolio name
$("#portfolio_name_save").click(
    function () {
        $.ajax({
            type: 'Post',
            url: "#",
            data: $("#portfolio_input").value,
            error: function (msg) {
                alert("Sorry, please try again!");
            },
            success: function (data) {
                // populate page, add this portfolio

            }
        });
    }
);

//echarts function start here
/*$(document).ready(
    function () {
        var dom = document.getElementById("echart");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;

        function splitData(rawData) {
            var categoryData = [];
            var values = [];
            var volumns = [];
            var close = [];
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i]);
                volumns.push(rawData[i][4]);
                close.push(rawData[i][1])
            }
            return {
                categoryData: categoryData,
                values: values,
                volumns: volumns,
                close: close
            };
        }

        function calculateMA(dayCount, data) {
            var result = [];
            for (var i = 0, len = data.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data.values[i - j][1];
                }
                result.push(+(sum / dayCount).toFixed(3));
            }
            return result;
        }

        $.ajax({
            type: 'get',
            url: "stock-DJI.json",
            dataType: "jsonp",
            success: function (rawdata) {
                var data = splitData(rawData);

                myChart.setOption(option = {
                    backgroundColor: '#eee',
                    animation: false,
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
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
                            data: data.categoryData,
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
                            data: data.categoryData,
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
                    series: [
                        {
                            name: 'Dow-Jones index',
                            type: 'candlestick',
                            data: data.values,
                            itemStyle: {
                                normal: {
                                    color: '#06B800',
                                    color0: '#FA0000',
                                    borderColor: null,
                                    borderColor0: null
                                },
                                encode: { tooltip: [1, 2] }
                            },
                        },

                        {
                            // name: "close",
                            type: 'line',
                            data: data.close,
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            },
                            tooltip: { show: false }


                        },

                        {
                            name: 'Volumn',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: data.volumns
                        }
                    ],
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
                }, true);

            }

        }
            );
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
)*/

//time picker

//daterangePicker
var beginTimeTake;
var endTimeTake;

//date range
$('#dateRangeStart').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: false,
    timePicker24Hour: true,
    timePicker: true,
    "locale": {
        format: 'YYYY-MM-DD HH:mm',
        applyLabel: "应用",
        cancelLabel: "取消",
        resetLabel: "重置",
    }
},
function (start, end, label) {
    beginTimeTake = start;
    if (!this.startDate) {
        this.element.val('');
    } else {
        this.element.val(this.startDate.format(this.locale.format));
        //validate
        if (!endTimeTake) {
            if (endTimeTake < beginTimeTake) {
                alert("Please input a valid end date!");
                this.element.val('');
            }
            //TODO



        }
    }
});
//
$('#dateRangeEnd').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: false,
    timePicker24Hour: true,
    timePicker: true,
    "locale": {
        format: 'YYYY-MM-DD HH:mm',
        applyLabel: "应用",
        cancelLabel: "取消",
        resetLabel: "重置",
    }
},
function (start, end, label) {
    endTimeTake = end;
    if (!this.endDate) {
        this.element.val('');
        alert("Please input a end date!");
    } else {
        this.element.val(this.endDate.format(this.locale.format));
        //validate
        if (!beginTimeTake) {
            if (endTimeTake < beginTimeTake) {
                alert("Please input a valid end date!");
                this.element.val('');
            }
            //TODO 
        }
    }
});

//single
$('#singleDate').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: false,
    timePicker24Hour: true,
    timePicker: true,
    "locale": {
        format: 'YYYY-MM-DD HH:mm',
        applyLabel: "应用",
        cancelLabel: "取消",
        resetLabel: "重置",
    }
},
function (start, end, label) {
    endTimeTake = end;
    if (!this.endDate) {
        this.element.val('');
    } else {
        this.element.val(this.endDate.format(this.locale.format));
    }
});

