using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace DataAnalytics.Utils
{
    public class SummaryUtil
    {
        private static string dbServerName = "sqlexpress02";

        public static string[] readSymbols()
        {
            List<string> symbols = new List<string>();
            var conn = new SqlConnection(@"server=.\" + dbServerName + "; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true");
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
            var summary = new summary();
            List<string> symbols = new List<string>();
            var conn = new SqlConnection(@"server=.\" + dbServerName + "; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true");
            conn.Open();
            var cmd = new SqlCommand("get_Summary", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@symbol", symbol);
            
            SqlDataReader resultReader = cmd.ExecuteReader();
            while (resultReader.Read())
            {
                summary.symbol = resultReader.GetValue(0).ToString();
                summary.open = resultReader.GetValue(1).ToString();
                summary.close = resultReader.GetValue(2).ToString();
                summary.high = resultReader.GetValue(3).ToString();
                summary.low = resultReader.GetValue(4).ToString();
                summary.volume = resultReader.GetValue(5).ToString();
                summary.earnings = resultReader.GetValue(6).ToString();
                summary.dividends = resultReader.GetValue(7).ToString();
            } 
            return summary;
        }
    }
}