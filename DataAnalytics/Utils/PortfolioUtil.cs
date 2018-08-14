using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataAnalytics.Utils {
    public class PortfolioUtil {
        public static bool _savePortfolio(string username,portfolio portfolio) {
            return true;
        }
        public static object _readPortfolioDetail(portfolio port)
        {
            return new { errmsg = "login time out" };
        }
        public static portfolio[] _readPortFolio(string username) {
            return null;
        }
    }
}