using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAnalytics.Utils {
    public class UserUtil {
        public static bool userSignIn(string username,string password) {
            return username == "user" && password == "pass";
        }
        public static bool userSignUp(string username,string password) {
            return username == "user" && password == "pass";
        }
    }
}