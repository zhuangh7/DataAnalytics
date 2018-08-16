//@{
//    ViewBag.Title = "Summary";
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

var inputSymbol;
var symbolsList;
$(function () {
    readSummary('a');
    readSymbols();
    $("#input_find").autocomplete({
        source: function (request, response) {
            console.log(symbolsList);
            var results = $.ui.autocomplete.filter(symbolsList, request.term);
            response(results.slice(0, 10));
            //console.log(results);
        },
    });

    $("input[name='apply']").click(function () {
        inputSymbol = $("#input_find").val();
        if ($.inArray(inputSymbol, symbolsList)==-1) {
            alert('iligal symbol');
            return;
        }
        //console.log(inputSymbol);
        readSummary(inputSymbol);//call API

    });

    function refreshTable(summary) {
        console.log('here');
        document.getElementById("symbolName").innerText = summary.symbol == null ? 'null' : summary.symbol;
        document.getElementById("close").innerText = summary.close;
        document.getElementById("open").innerText = summary.open;
        document.getElementById("high").innerText = summary.high;
        document.getElementById("low").innerText = summary.low;
        document.getElementById("earnings").innerText = summary.earnings;
        document.getElementById("dividents").innerText = summary.dividends;

    }
    $("input[name='Compare']").click(function () {
        location.href = "/home/detail_?baseSymbol=" + inputSymbol;
    });

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
                    inputSymbol = result.data.symbol;
                    refreshTable(result.data);
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
                        symbolsList = result.data;
                        //
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

    /*
     * to use function here, you need to create your own -----> onClickCompare <----- function and get the specific symbol user choosen,
     * then use the baseSymbol call below function will work well
     */
    function goDetail(baseSymbol) {
        location.href = '/home/detail_?baseSymbol=' + baseSymbol;
    }
});
