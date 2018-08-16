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


$(function () {
    var symbols = readSymbols();
    symbols = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Chai",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $("#input_find").autocomplete({
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(symbols, request.term);
            response(results.slice(0, 10));
            //console.log(results);
        },
    });

    $("input[name='apply']").click(function () {
        var inputSymbol = $("#input_find").val();
        console.log(inputSymbol);
        readSummary(inputSymbol);//call API

    });

    $("input[name='Compare']").click(function () {
        var inputSymbol = $("#input_find").val();
        console.log(inputSymbol);
        var summary = readSummary(inputSymbol);//call API

        $("#symbol").val = summary.symbol;
        $("#close").val = summary.close;
        $("#open").val = summary.open;
        $("#high").val = summary.high;
        $("#low").val = summary.low;
        $("#earnings").val = summary.earnings;
        $("#dividents").val = summary.dividents;
        location.href = "/home/detail?baseSymbol=" + inputSymbol;
    });
    $("input[name='display']").click(function () {
        var inputSymbol = $("#input_find").val();
        console.log(inputSymbol);
        var symbolName = document.getElementById("symbolName");
        symbolName.innerText = inputSymbol;
        var close = document.getElementById("close");
        close.innerText = "23";
        var open = document.getElementById("open");
        open.innerText = "24";
        var high = document.getElementById("high");
        high.innerText = "25";
        var high = document.getElementById("high");
        high.innerText = "26";
        var low = document.getElementById("low");
        low.innerText = "27";
        var earnings = document.getElementById("earnings");
        earnings.innerText = "28";
        var dividents = document.getElementById("dividents");
        dividents.innerText = "29";
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
                        return result.data;
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
        location.href = '/home/_detail?baseSymbol=' + baseSymbol;
    }
});
