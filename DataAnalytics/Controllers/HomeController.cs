using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataAnalytics.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if ((string)Session["login"] == "login")
            {
                return View("portfolio");
            }
            return View();
        }
        
        [HttpGet]
        public ViewResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public string SignUp(string username,string password)
        {
            return "get";
        }

        [HttpGet]
        public ViewResult Portfolio()
        {
            return View();
        }

        public string Summary()
        {
            return "summary";
        }

        public string Chart()
        {
            return "chart";
        }
    }
}
