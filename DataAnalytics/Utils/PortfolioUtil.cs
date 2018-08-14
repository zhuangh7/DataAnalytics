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

        public static portfolio[] _readPortFolio(string username) {
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