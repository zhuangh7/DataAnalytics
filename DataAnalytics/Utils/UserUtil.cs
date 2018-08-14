using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DataAnalytics.Utils {
    public class UserUtil {
        public static bool userSignIn(string username,string password) {
            string pwd;
            var conn = new SqlConnection(@"server=.\sqlexpress02;database=DataAnalytics;integrated security=true");
            var cmd = new SqlCommand("get_allSymbols", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();
            SqlDataReader resultReader = cmd.ExecuteReader();
            int i = 0;
            while (resultReader.Read())
            {
                symbols.Add(resultReader.GetValue(1).ToString());
                i++;
            }

            conn.Close();
            return symbols.ToArray();
        }
        public static bool userSignUp(string username,string password) {
            return username == "user" && password == "pass";
        }
    }
}