using DataAnalytics.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataAnalytics.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            if ((string)Session["login"] == "login")
            {
                return View("portfolio");
            }
            return View("signin");
        }
        
        [HttpPost]
        public ActionResult Index(string username,string password) {
            if (ViewBag.Title != null) {
                Console.WriteLine("viewbag.title is no null! is : " + ViewBag.Title);
            }
            if(Utils.UserUtil.userSignIn(username, password)) {
                Session.Timeout = 1;
                Session["login"] = "login";
                Session["username"] = username;
                Session["password"] = password;
                return RedirectToAction("portfolio");
            } else {
                ViewBag.errmsg = "User name not exist or password not match";
                return View("signin");
            }
        }

        [HttpGet]
        public ViewResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public ViewResult SignUp(string username,string password)
        {
            if (Utils.UserUtil.userSignUp(username, password)) {
                Session["login"] = "login";
                Session["username"] = username;
                Session["password"] = password;
                ViewBag.register = true;
            } else {
                ViewBag.errmsg = "User already exist";
            }
            return View();
        }

        [HttpGet]
        public ViewResult Portfolio()
        {
            //the web page call like this one should judge ViewBag.username to determine if redirect to signin
            ViewBag.username = Session["username"];
            ViewBag.password = Session["password"];
            return View();
        }

        [HttpPost]
        public ActionResult savePortfolio(portfolio item) {
            if (Session["username"] != null) {
                var result = DataAnalytics.Utils.PortfolioUtil._savePortfolio((string)["username"], item);
                return Json(new { msg = result });
            } else {
                return Json(new { errmsg = "login time out" });
            }
        }

        [HttpPost]
        public ActionResult readPortfolio() {
            if (Session["username"] != null) {
                var result = DataAnalytics.Utils.PortfolioUtil._readPortFolio((string)Session["username"]);
                return Json(new { data = result });
            } else {
                return Json(new { errmsg = "login time out" });
            }
        }

        [HttpGet]
        public string Summary()
        {
            //the web page call like this one should judge ViewBag.username to determine if redirect to signin
            ViewBag.username = Session["username"];
            ViewBag.password = Session["password"];
            return "summary";
        }

        public string Chart()
        {
            //the web page call like this one should judge ViewBag.username to determine if redirect to signin
            ViewBag.username = Session["username"];
            ViewBag.password = Session["password"];
            return "chart";
        }
    }

}
