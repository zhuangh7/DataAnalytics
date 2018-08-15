using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataAnalytics.Utils {
    public class PortfolioUtil {
        private static string dbServerName = "sqlexpress02";

        public static bool _savePortfolio(string username,portfolio portfolio) {
            try
            {
                var conn = new SqlConnection(@"server=.\" + dbServerName + "; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true");
                var cmd = new SqlCommand("save_Portfolio", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userName", username);
                cmd.Parameters.AddWithValue("@PortName", portfolio.portfolioname);
                cmd.Parameters.AddWithValue("@from", portfolio.from);
                cmd.Parameters.AddWithValue("@to", portfolio.to);
                cmd.Parameters.AddWithValue("@split", portfolio.split);
                conn.Open();
                int result = (int)cmd.ExecuteScalar();

                var cmd_1 = new SqlCommand("save_Portfolio_Items", conn);
                cmd_1.CommandType = CommandType.StoredProcedure;
                foreach (string symbol in portfolio.symbols)
                {
                    cmd_1.Parameters.AddWithValue("@PortID", result);
                    cmd_1.Parameters.AddWithValue("@symbol", symbol);
                    cmd_1.ExecuteNonQuery();
                }
                conn.Close();
                return true;
            }
            catch (SqlException)
            {
                return false;
            }
        }

        public static object _readPortfolioDetail(portfolio port)
        {
            return new { errmsg = "login time out" };
        }

        public static portfolio _getPortfolio(string portfolioId)
        {
            var conn = new SqlConnection(@"server=.\" + dbServerName + "; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true");
            var cmd = new SqlCommand("get_Portfolio_ByPortID", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PortID", int.Parse(portfolioId));
            conn.Open();
            SqlDataReader resultReader = cmd.ExecuteReader();
            var portfolio = new portfolio();
            while (resultReader.Read())
            {
                portfolio.portfolioID = int.Parse(resultReader.GetValue(0).ToString());
                portfolio.portfolioname = resultReader.GetValue(2).ToString();
                portfolio.from = resultReader.GetValue(3).ToString();
                portfolio.to = resultReader.GetValue(4).ToString();
                portfolio.split = resultReader.GetValue(5).ToString();

                var cmd_getSymbols = new SqlCommand("get_Portfolio_Items", conn);
                cmd_getSymbols.CommandType = CommandType.StoredProcedure;
                cmd_getSymbols.Parameters.AddWithValue("@PortID", portfolio.portfolioID);
                
                SqlDataReader resultReader_symbols = cmd_getSymbols.ExecuteReader();
                List<string> symbols = new List<string>();
                while (resultReader_symbols.Read())
                {
                    symbols.Add(resultReader_symbols.GetValue(0).ToString());
                }

                portfolio.symbols = symbols.ToArray();
            }

            conn.Close();
            return portfolio;
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
            List<portfolio> portfolios = new List<portfolio>();

            var conn = new SqlConnection(@"server=.\" + dbServerName + "; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true");
            var cmd = new SqlCommand("get_Portfolio", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@name", username);
            conn.Open();
            SqlDataReader resultReader = cmd.ExecuteReader();
            while(resultReader.Read())
            {
                var portfolio = new portfolio();
                portfolio.portfolioID = int.Parse(resultReader.GetValue(0).ToString());
                portfolio.portfolioname = resultReader.GetValue(2).ToString();
                portfolio.from = resultReader.GetValue(3).ToString();
                portfolio.to = resultReader.GetValue(4).ToString();
                portfolio.split = resultReader.GetValue(5).ToString();

                var cmd_getSymbols = new SqlCommand("get_Portfolio_Items", conn);
                cmd_getSymbols.CommandType = CommandType.StoredProcedure;
                cmd_getSymbols.Parameters.AddWithValue("@PortID", portfolio.portfolioID);
                conn.Open();
                SqlDataReader resultReader_symbols = cmd_getSymbols.ExecuteReader();
                List<string> symbols = new List<string>();
                while (resultReader_symbols.Read())
                {
                    symbols.Add(resultReader_symbols.GetValue(0).ToString());
                }

                portfolio.symbols = symbols.ToArray();

                portfolios.Add(portfolio);
            }

            conn.Close();
            return portfolios.ToArray();
        }
    }
}