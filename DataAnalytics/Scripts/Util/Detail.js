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
var symbolList = [];
var portfolio = window.currentPortfolio;
//save temp symbol add by user
var tempSymbol = [];
var summaryList = [];
$(document).ready(function () {
    //show portfolio name
    if (portfolio.portfolioname) {
        $("#portfolio_name").text(portfolio.portfolioname);
    }

    //load symbol list
    readSymbols();

    //load portfolio's symbol
    for (var i = 0; i < portfolio.symbols.length; i++) {
        readSummary(portfolio.symbols[i]);
    }
    console.log('fk portfolio');
    console.log(portfolio);
    initData(portfolio.from, portfolio.to, portfolio.split, portfolio.symbols);
});
function refreshDataTable() {
    $('#symbols_table').DataTable({
        columns: [
            {
            data: 'symbol',
            title: 'Symbol Name'
        }, {
            data: 'open',
            title: 'Open Price'
        }, {
            data: 'close',
            title: 'Close Price'
        }, {
            data: 'high',
            title: 'High Price'
        }, {
            data: 'low',
            title: 'Low Price'
        }
        ],
        data: summaryList
    });
}
function readSummary(symbol) {
    $.ajax({
        type: "POST",
        url: "/home/readSummary",
        dataType: "json",
        data: { summary: symbol },
        success: function (result) {
            console.log(result); //this result will be a signle json object which contain '''errmsg''' or '''data''' which contain a summary object
            if (result.errmsg != null) {
                alert('readDataError');
            } else {
                //get data from result.data
                summaryList.push(result.data);
                refreshDataTable();
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
                    symbolList = result.data;
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

function saveCurrentPortfolio(_from, _to, _split,_name, _symbols) {
    var samplePersonObject = {
        from: _from,
        to: _to,
        split: _split,
        portfolioname:_name,
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
                    alert("save successfully");
                    portfolio.portfolioname = $("#portfolio_input").val();
                    $("#portfolio_input").text('');
                    $("#portfolio_name").text(portfolio.portfolioname);
                    $("#myModal").modal("hide");


                } else {
                    //fail to save
                    alert('error when save portfolio, try again');
                    $("#portfolio_name_save").attr("disabled", true);
                }
            }

        },
        error: function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        }
    });
    return false;
}

function readPortfolioDetail(_from, _to, _split, _symbols, callback) {
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
            console.log('this is get portfolio result')
            console.log(result); //this result will be a signle json object which contain '''errmsg''' or '''data''' which is a object
            callback(result.data);
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
        var flag = false;
        //validate it's a valid symbol
        for (var i = 0; i < symbolList.length; i++) {
            if (symbolList[i] == $("#input_find").val()) {
                flag = true;
            }
        }
        if (flag == false) {
            alert("Please choose again, because this symbol not exits!");
            $("#input_find").val('');
            return;
        }
        ///and this symbol can't be same with exits symbol
        for (var i = 0; i < portfolio.symbol.length; i++) {
            if (portfolio.symbol[i] == $("#input_find").val()) {
                alert("Sorry, this symbol already exits!");
                return;
            }
        }
        for (var i = 0; i < tempSymbol.length; i++) {
            if (tempSymbol[i] == $("#input_find").val()) {
                alert("Sorry, this symbol already exits!");
                return;
            }
        }
        //add symbol to portfolio
        portfolio.symbol.push($("#input_find").val());

        //echart function here
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
        $(this).attr("disabled", false);
        console.log("hi"+portfolio.portfolioname);
        saveCurrentPortfolio(portfolio.from, portfolio.to, portfolio.split, $("#portfolio_input").val(), portfolio.symbols);
    }
);

//time picker

//daterangePicker
var beginTimeTake;
var endTimeTake;
var singleTimeTake;

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
            if (endTimeTake) {
                if (endTimeTake < beginTimeTake) {
                    alert("Please input a valid end date!");
                    this.element.val('');
                    return;
                }
                /* readPortfolioDetail(beginTimeTake, endTimeTake, "d", symbol);*/
                portfolio.from = MonentObjectFormart(beginTimeTake);
                portfolio.to = MonentObjectFormart(endTimeTake);
                //echart function here
            }
        }
    });
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
            if (beginTimeTake) {
                if (endTimeTake < beginTimeTake) {
                    alert("Please input a valid end date!");
                    this.element.val('');
                    return;
                }
                if ($('#singleDate').val().length != 0) {
                    alert("Please choose a single date or date change, not both!");
                    return;
                }
                //TODO 
                portfolio.from = MonentObjectFormart(beginTimeTake);
                portfolio.to = MonentObjectFormart(endTimeTake);
                //echart function here
            }
        }
    });

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
        singleTimeTake = end;
        if (!this.endDate) {
            this.element.val('');
        } else {

            if ($('#dateRangeEnd').val().length != 0 || $('#dateRangeStart').val().length!=0) {
                alert("Please choose a single date or date change, not both!");
                return;
            }

            this.element.val(this.endDate.format(this.locale.format));
            //TODO 
            portfolio.from = MonentObjectFormart(singleTimeTake);
            //echart function here
        }
});
function MonentObjectFormart(m) {
    var str = "";
    if (!m) {
        return null;
    }
    for (var i = 0; i < 3; i++) {
        var mi = m._i[i].toString();
        if(mi.length==1){
            str=str+'0'+m._i[i];
        }else{
            str+=m._i[i];
        }
    }
    return str;
}

//echarts
var dom = document.getElementById("container");//<div id="container" style="height: 100%"></div>
var myChart1 = echarts.init(dom);
//var mychart2 = echarts.init(dom);
// var app = {};

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
    name: 'baseindex',
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
        data: ['baseindex']
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
            start: 80,
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


function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns = [];
    var close = [];
    var symbolname = [];
    for (var i = 0; i < rawData.length; i++) {
        symbolname.push(rawData[i].splice(0, 1)[0]);
        categoryData.push(rawData[i].splice(0, 2)[1]);
        values.push(rawData[i]);
        volumns.push(rawData[i][4]);
        close.push(rawData[i][1]);

    }
    return {
        symbolname: symbolname,
        categoryData: categoryData,
        values: values,
        volumns: volumns,
        close: close,
    };
}


function updateEchartBase(data) {
    if (!myChart1) {
        return;
    }
    var data1 = splitData(data[0]);
    var option = myChart1.getOption();
    inimodel1.data = data1.values;
    inimodel2.data = data1.close;
    inimodel3.data = data1.volumns;
    option.series.push(inimodel1, inimodel2, inimodel3)
    option.xAxis[0].data = data1.categoryData;
    option.xAxis[1].data = data1.categoryData;
    myChart1.setOption(option);
}

function addEchartSymbol(data) {
    var option = myChart1.getOption();
    var datao = [];
    for (var i = 1; i < length(data); i++) {
        datao.push(splitData(data[i]));
        addmodel.data = datao[i].close;
        addmodel.name = datao[i].symbolname;
        option.series.push(addmodel.data)
    }
    myChart1.setOption(option);
}

function addEchartSymbol_2(data) {
    var option = myChart1.getOption();
    var datao = [];
    for (var i = 0; i < length(data); i++) {
        datao.push(splitData(data[i]));
        addmodel.data = datao[i].close;
        option.series.push(addmodel.data)
    }
    myChart1.setOption(option);
}

function initData(_from, _to, _split, _symbols) {
    readPortfolioDetail(_from, _to, _split, _symbols, function (data) {
        updateEchartBase(data);
        addEchartSymbol(data);
    });
}

function addData(symbol) {
    portfolio.symbols.push(symbol)
    if (portfolio.symbols == null) {
        alert('fkyou');
    }
    var func = function (data) {
        addEchartSymbol_2(data);
    };
    readPortfolioDetail(portfolio.from, portfolio.to, portfolio.split, portfolio.symbols[length(portfolio.symbols) - 1], func);
}

//function (start, end, label) {
//    endTimeTake = end;
//    if (!this.endDate) {
//        this.element.val('');
//    } else {
//        this.element.val(this.endDate.format(this.locale.format));
//        //TODO 
//        portfolio.from = beginTimeTake;
//        //echart function here
//    }
//});
$(document).ready(function () {
    var timeoutID;
    var cover = document.getElementById("cover");
    var covershow = document.getElementById("coverShow");
    cover.style.display = 'block';
    covershow.style.display = 'block';
    timeoutID = window.setTimeout(function 
    () {
        cover.style.display = 'none';
        covershow.style.display = 'none';
    }, 3000);
});
