using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DataAnalytics.Controllers
{
    public class User
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class UserController : ApiController
    {
        public string Post([FromBody]User user)
        {
            if (user.password == "")
            {
                //no password means check username
                if (checkUser(user.username))
                {
                    return "true";
                    //true means user exist
                }
                else
                {
                    return "false";
                    //user not exist
                }
            }
            else
            {
                return user.username;
            }
        }

        public bool checkUser(string name)
        {
            return false;
        }
    }
}
