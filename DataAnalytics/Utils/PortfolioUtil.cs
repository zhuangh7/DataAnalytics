using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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

        public static portfolio _getPortfolio(string portfolioId)
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
        public static portfolio[] _readPortfolio(string username) {
          var conn = new SqlConnection(@"server=.\sqlexpress02;database=DataAnalytics;integrated security=true");
            var cmd = new SqlCommand("get_UserPwd", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@name", username);
            conn.Open();
            SqlDataReader resultReader = cmd.ExecuteReader();
            //未完待续
            conn.Close();
            return null;
        }
    }
}