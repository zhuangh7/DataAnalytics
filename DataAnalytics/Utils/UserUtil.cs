using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DataAnalytics.Utils {
    public class UserUtil {
        public static bool userSignIn(string username,string password) {
            string pwd = "";
            var conn = new SqlConnection(SQLConnectionStr.connectionStr);
            var cmd = new SqlCommand("get_UserPwd", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@name", username);
            conn.Open();
            SqlDataReader resultReader = cmd.ExecuteReader();
            while (resultReader.Read())
            {
                pwd = resultReader.GetValue(0).ToString();
            }
            conn.Close();
            if (pwd.Equals(password))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool userSignUp(string username,string password) {
            var conn = new SqlConnection(SQLConnectionStr.connectionStr);
            var cmd = new SqlCommand("save_User", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@name", username);
            cmd.Parameters.AddWithValue("@pwd", password);
            conn.Open();
            try
            {
                int result = cmd.ExecuteNonQuery();
                conn.Close();
                if (result == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (SqlException)
            {
                return false;
            }

        }
    }
}