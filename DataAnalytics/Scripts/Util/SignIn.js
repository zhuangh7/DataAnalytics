//@{
//    ViewBag.Title = "signin";
//    if(ViewBag.errmsg != null) {
//        <script>
//            alert("@ViewBag.errmsg");
//        </script>
//    }
//}
/*if user try to sign in and failed, then will show err msg*/

//<form action="#" method="post">
//    First name: <input type="text" name="username" />
//    Last name: <input type="text" name="password" />
//    <input type="submit" value="Submit" />
//</form>
/*need form with post method to post username and password*/

//<input type="button" onclick="location.href='/home/signup';" value="SignUp" />
/*also need a button to jump to sign up page*/

        $(function () {
            // bg switcher
        var $btns = $(".bg-switch .bg");
        $btns.click(function (e) {
        e.preventDefault();
        $btns.removeClass("active");
        $(this).addClass("active");
        var bg = $(this).data("img");

        $(".login-bg").css("background", "url('~/Content/img/bgs/" + bg + ".jpg')");
    });

});