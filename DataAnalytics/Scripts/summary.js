$(function () {
    var symbolNum = 0;
    var availableTags = [
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
            var results = $.ui.autocomplete.filter(availableTags, request.term);
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
    var getProducts = function () {
        $.ajax({
            url: "http://tonycox.net/neueda/NeuedaService.asmx/getproducts",
            type: "GET",
            dataType: "jsonp",
            crossDomain: true,
            success: function (response) {
                showProducts(response.Results);
            }
        });
    };
    getProducts();

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
        if (symbolNum!=1)
            alert("Please input a correct symbol!")
        else location.href = "/home/detail?baseSymbol=" + inputSymbol;
    });
});
    