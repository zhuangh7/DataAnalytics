
var symbolList = ["hi", "nice", "well done","haha"];
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
$(function() {
        //var availableTags = ["标缝路","诚信路","公诚路","万诚路","何寇路","何潘路","何新路","栎西路","房西路","文化东路","桃源东路","石家东路"];
        $( "#input_find" ).autocomplete({
            source:
                    function(request, response) {
                        var results = $.ui.autocomplete.filter(symbolList, request.term);
                        response(results.slice(0, 10));//只显示自动提示的前十条数据
                    },
            messages: {
                noResults: '',
                results: function() {}
            },
        });
 
    });

    //add symbol btn 
$("#add_btn").click(
    function(){
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
