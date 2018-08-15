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
    $('#portfolioTable').DataTable({
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
    });
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
        $.ajax(
            {
                type: "Post",
                url: "#",
                data: $("input_name").value,
                sunccess: function (data) {
                    if (data == 0) {
                        windows.location.href = "portfolio.html";
                    } else {
                        alert("");
                    }
                }
            }
        )
    }

);
