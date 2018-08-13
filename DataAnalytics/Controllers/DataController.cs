using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DataAnalytics.Controllers
{
    public class DataController : ApiController
    {
        // GET api/data
        public string Get(string symbols,string from,string to,string split)
        {
            //get data
            var symbolsList = symbols.Split(' ');
            return symbols+" "+ symbolsList.Length;
        }

        // GET api/data
        public string Get()
        {
            //get symbols
            return "";
        }
    }
}
