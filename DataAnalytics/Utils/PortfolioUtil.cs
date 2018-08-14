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

        public static portfolio _getPortFolio(string portfolioName)
        {
            return new portfolio();
        }
        public static portfolio _getDefaultPortfolio(string baseSymbol)
        {
            var portfolio = new portfolio();
            portfolio.split = "h";
            portfolio.from = "2018/5/1";
            portfolio.to = "2018/7/1";
            portfolio.symbols = new string[]{ baseSymbol };
            return portfolio;
        }
        public static portfolio[] _readPortFolio(string username) {
            return null;
        }
    }
}