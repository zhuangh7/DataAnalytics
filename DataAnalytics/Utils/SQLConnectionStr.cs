using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAnalytics.Utils
{
    public class SQLConnectionStr
    {
        public static string junwen = @"server=.\sqlexpress; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true";
        public static string Pan = @"server=.\sqlexpress02; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true";
        public static string Xiuyun = "server= Lenovo-PC; database=DataAnalytics;integrated security=true;MultipleActiveResultSets = true";
        public static string connectionStr = Pan;
    }
}