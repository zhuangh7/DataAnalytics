using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAnalytics.Utils {
    public class portfolio {
        public int portfolioID { get; set; }
        public string portfolioname { get; set; }
        public string[] symbols { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public string split { get; set; }
    }
}