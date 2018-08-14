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

/*
 * to use function here, you need to create your own -----> onClickCompare <----- function and get the specific symbol user choosen,
 * then use the baseSymbol call below function will work well
 */
function goDetail(baseSymbol) {
    location.href = '/home/_detail?baseSymbol=' + baseSymbol;
}