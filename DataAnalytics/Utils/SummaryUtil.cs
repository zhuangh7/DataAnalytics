using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

namespace DataAnalytics.Utils
{
    public class SummaryUtil
    {
        private static string connectionString = "server=sqlexpress02;database=DataAnalytics;integrated security=true";

        public static string[] readSymbols()
        {
            List<string> symbols = new List<string>();
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

        public static summary readSummary(string symbol)
        {
            return new summary();
        }
    }
}