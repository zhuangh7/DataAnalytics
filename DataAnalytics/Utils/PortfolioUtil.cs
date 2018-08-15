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

                foreach (string symbol in portfolio.symbols)
                {
                    var cmd_1 = new SqlCommand("save_Portfolio_Items", conn);
                    cmd_1.CommandType = CommandType.StoredProcedure;
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
            string[] symbols = port.symbols;
            string from = port.from;
            string to = port.to;
            string split = port.split;
            if (string.IsNullOrEmpty(split))
            {
                List<Array> aPortfolio_Whole_Data = new List<Array>();
                if (to.Equals(from) || string.IsNullOrEmpty(to))
                {
                    aPortfolio_Whole_Data = getMData(symbols, from);
                }else
                {
                    aPortfolio_Whole_Data = getHData(symbols, from, to);
                }
                return aPortfolio_Whole_Data;
            }
            else
            {
                if (split.Equals("m"))
                {

                }else if (split.Equals("h"))
                {

                }else if (split.Equals("d"))
                {

                }
                return new { errmsg = "It has not been completed" };
            }
            return new { errmsg = "login time out" };
        }

        private static List<Array> getMData(string[] symbols, string from)
        {
            var conn = new SqlConnection(@"server=.\" + dbServerName + "; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true");
            conn.Open();
            List<Array> aPortfolio_Whole_Data = new List<Array>();
            foreach (string symbol in symbols)
            {
                List<Array> aSymbol_whole_Data = new List<Array>();
                var cmd = new SqlCommand("get_MinuteData", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@date", int.Parse(from));
                cmd.Parameters.AddWithValue("@symbol", symbol);
                SqlDataReader resultReader = cmd.ExecuteReader();
                while (resultReader.Read())
                {
                    List<string> aSymbol_singleMunite_Data = new List<string>();
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(0).ToString());
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(1).ToString());
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(2).ToString());
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(3).ToString());
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(4).ToString());
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(5).ToString());
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(6).ToString());
                    aSymbol_singleMunite_Data.Add(resultReader.GetValue(7).ToString());

                    aSymbol_whole_Data.Add(aSymbol_singleMunite_Data.ToArray());
                }
                aPortfolio_Whole_Data.Add(aSymbol_whole_Data.ToArray());
            }
            
            return aPortfolio_Whole_Data;
        }

        private static List<Array> getHData(string[] symbols, string from, string to)
        {
            var conn = new SqlConnection(@"server=.\" + dbServerName + "; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true");
            conn.Open();
            List<Array> aPortfolio_Whole_Data = new List<Array>();
            foreach (string symbol in symbols)
            {
                List<Array> aSymbol_whole_Data = new List<Array>();
                var cmd = new SqlCommand("get_HourData", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@startDate", int.Parse(from));
                cmd.Parameters.AddWithValue("@endDate", int.Parse(to));
                cmd.Parameters.AddWithValue("@symbol", symbol);
                SqlDataReader resultReader = cmd.ExecuteReader();
                while (resultReader.Read())
                {
                    List<string> aSymbol_singleHour_Data = new List<string>();
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(0).ToString());
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(1).ToString());
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(2).ToString());
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(3).ToString());
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(4).ToString());
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(5).ToString());
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(6).ToString());
                    aSymbol_singleHour_Data.Add(resultReader.GetValue(7).ToString());

                    aSymbol_whole_Data.Add(aSymbol_singleHour_Data.ToArray());
                }
                aPortfolio_Whole_Data.Add(aSymbol_whole_Data.ToArray());
            }

            return aPortfolio_Whole_Data;
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