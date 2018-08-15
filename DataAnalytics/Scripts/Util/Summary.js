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
    var symbolNum = 0;
    //var symbols = readSymbols();
    var symbols = [
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
            symbolNum = results.length;
        },
    });


    var showProducts = function (products) {
        $("#dataa").DataTable({
            "columns": [{ data: "ProductID" },
            { data: "ProductName" }],
            data: products
        });
    };
    //var getProducts = function () {
    //    $.ajax({
    //        url: "http://tonycox.net/neueda/NeuedaService.asmx/getproducts",
    //        type: "GET",
    //        dataType: "jsonp",
    //        crossDomain: true,
    //        success: function (response) {
    //            showProducts(response.Results);
    //        }
    //    });
    //};
    //getProducts();

    $("input[name='apply']").click(function () {
        var inputSymbol = $("#input_find").val();
        console.log(inputSymbol);
        //readSummary(inputSymbol);//call API
        var table = $('#dataa').DataTable();
        table.search(inputSymbol).draw();
    });

    $("input[name='detail']").click(function () {
        var inputSymbol = $("#input_find").val();
        console.log(inputSymbol);
        //readSummary(inputSymbol);//call API
        var table = $('#dataa').DataTable();
        table.search(inputSymbol).draw();
        //console.log(table);
        if (symbolNum != 1)
            alert("Please input a correct symbol!")
        else location.href = "/home/detail?baseSymbol=" + inputSymbol;
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
                    showProducts(result.data.Results);
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
