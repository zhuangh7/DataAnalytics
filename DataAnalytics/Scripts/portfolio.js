$(".model_cancel_btn").click(
    function () {
        $(".modal").modal("hide");
    }
);

$(document).ready(
 ShowPortFolio()   
);

function ShowPortFolio() {
    $.ajax({
        type: 'Get',
        url: "#",
        error: function (msg) {
            alert(msg);
        },
        success: function (data) {

            var portfoliosList = eval(data);
            var list = getElementsByClassName("first")[0];

        }

    }

    )

}

//save portfio name
$("#sumbit_btn").click(
    function () {
        if ($("#portfolio_input").value == null || $("#portfolio_input").value.length == 0) {
            alert("please input a symbol name");
            return;
        }
        $.ajax({
            type: 'Post',
            url: "#",
            data: $("#portfolio_input").value,
            error: function (msg) {
                alert(msg);
            },
            success: function (data) {
                

            }
        });
    }
);