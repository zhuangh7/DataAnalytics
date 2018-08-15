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
$(document).ready(function () {
    //show portfolio name
    if (portfolio.portfolioname) {
        $("#portfolio_name").text(portfolio.portfolioname);
    }
    
    //load symbol list
    readSymbols();

    var summaryList = [];
    //load portfolio's symbol
    for (var i = 0; i < portfolio.symbols.length ; i++) {
        var summmary = readSummary(portfolio.symbols[i]);
        summaryList.push(summary);
    }

    $('#symbols_table').bootstrapTable({
        columns: [{
            field: 'symbol',
            title: 'Symbol Name'
        }, {
            field: 'open',
            title: 'Open Price'
        }, {
            field: 'close',
            title: 'Close Price'
        }, {
            field: 'high',
            title: 'High Price'
        }, {
            field: 'low',
            title: 'Low Price'
        }
        ],
        data: summaryList
    });
});
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
                return result.data;
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
        var flag=false;
        //validate it's a valid symbol
        for (var i = 0; i < symbolList.length ; i++) {
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
        for (var i = 0; i < portfolio.symbol.length ; i++) {
            if (portfolio.symbol[i] == $("#input_find").val()) {
                alert("Sorry, this symbol already exits!");
                return;
            }
        }
        for (var i = 0; i < tempSymbol.length ; i++) {
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
        if (!portfolio.portfolioname) {
            $("#myModal").modal("show");
        } else {
            saveCurrentPortfolio(portfolio.from, portfolio.to, portfolio.split, portfolio.symbols);
            $("#portfolio_name").text(portfolio.portfolioname);
        }
    }
);

//save portfolio name
$("#portfolio_name_save").click(
      function(){
          saveCurrentPortfolio(portfolio.from, portfolio.to, portfolio.split, portfolio.symbols);
      }
);

//time picker

//daterangePicker
var beginTimeTake;
var endTimeTake;

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
            portfolio.from = beginTimeTake;
            portfolio.to = endTimeTake;
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
            //TODO 
            portfolio.from = beginTimeTake;
            portfolio.to = endTimeTake;
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
    endTimeTake = end;
    if (!this.endDate) {
        this.element.val('');
    } else {
        this.element.val(this.endDate.format(this.locale.format));
        //TODO 
        portfolio.from = beginTimeTake;
        //echart function here
    }
});
