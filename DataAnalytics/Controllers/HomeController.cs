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
            if ((string)Session["login"] == "login" && Session["username"]!=null && Session["password"]!=null)
            {
                return RedirectToAction("portfolio");
            }
            return View("signin");
        }
        
        [HttpPost]
        public ActionResult Index(string username,string password) {
            if (ViewBag.Title != null) {
                Console.WriteLine("viewbag.title is no null! is : " + ViewBag.Title);
            }
            if(Utils.UserUtil.userSignIn(username, password)) {
                Session.Timeout = 15;//sign out auto if user dont action in 15 minutes
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
        public ActionResult savePortfolioDetail(portfolio item) {
            if (Session["username"] != null) {
                var result = DataAnalytics.Utils.PortfolioUtil._savePortfolio((string)Session["username"], item);
                return Json(new { msg = result });
            } else {
                return Json(new { errmsg = "login time out" });
            }
        }

        [HttpPost]
        public ActionResult readPortfolioDetail(portfolio item)
        {
            if (Session["username"] != null)
            {
                var result = DataAnalytics.Utils.PortfolioUtil._readPortfolioDetail(item);
                return Json(result);
            }
            else
            {
                return Json(new { errmsg = "login time out" });
            }
        }

        [HttpPost]
        public ActionResult readPortfolio() {
            if (Session["username"] != null) {
                var result = DataAnalytics.Utils.PortfolioUtil._readPortfolio((string)Session["username"]);
                return Json(new { data = result });
            } else {
                return Json(new { errmsg = "login time out" });
            }
        }

        [HttpPost]
        public ActionResult readSymbols()
        {
            if (Session["username"] != null)
            {
                var result = DataAnalytics.Utils.SummaryUtil.readSymbols();
                return Json(new { data = result });
            }
            else
            {
                return Json(new { errmsg = "login time out" });
            }
        }

        [HttpPost]
        public ActionResult readSummary(string summary)
        {
            if (Session["username"] != null)
            {
                var result = DataAnalytics.Utils.SummaryUtil.readSummary(summary);
                return Json(new { data = result });
            }
            else
            {
                return Json(new { errmsg = "login time out" });
            }
        }

        [HttpGet]
        public ActionResult Summary()
        {
            //the web page call like this one should judge ViewBag.username to determine if redirect to signin
            ViewBag.username = Session["username"];
            ViewBag.password = Session["password"];
            return View();
        }

        [HttpGet]
        public ActionResult Detail(string portfolioId)
        {
            //the web page call like this one should judge ViewBag.username to determine if redirect to signin
            portfolio a = PortfolioUtil._getPortfolio(portfolioId);
            ViewBag.portfolio = a;
            ViewBag.username = Session["username"];
            ViewBag.password = Session["password"];
            return View("Detail");
        }

        [HttpGet]
        public ActionResult Detail_(string baseSymbol)
        {
            portfolio a = PortfolioUtil._getDefaultPortfolio(baseSymbol);
            ViewBag.portfolio = a;
            ViewBag.username = Session["username"];
            ViewBag.password = Session["password"];
            return View("Detail");
        }
    }

}
