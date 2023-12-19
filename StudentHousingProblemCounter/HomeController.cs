using Microsoft.AspNetCore.Mvc;
using StudentHousingProblemCounter.ViewModels;

namespace StudentHousingProblemCounter
{
    [Route("")]
    public class HomeController : Controller
    {
        private const string visitorsTextFileName = "VisitorsCounter.txt";

        private int counter = 0;

        public async Task<IActionResult> Index()
        {
            int visitors = 0;

            if (System.IO.File.Exists(visitorsTextFileName))
            {
                string numberOfVisitor = await System.IO.File.ReadAllTextAsync(visitorsTextFileName);
                visitors = int.Parse(numberOfVisitor);
            }

            var isCounted = Request.Cookies["_countedUser"];
            if (isCounted == null)
            {
                Response.Cookies.Append("_countedUser", "true");
                ++visitors;
            }

            await System.IO.File.WriteAllTextAsync(visitorsTextFileName, visitors.ToString());

            return View(new HomeViewModel { Count = visitors });
        }


        [HttpPost]
        [Route("livedata")]
        public async Task<int> GetCurrent()
        {
            if (System.IO.File.Exists(visitorsTextFileName))
            {
                var numberOfVisitor = int.Parse(await System.IO.File.ReadAllTextAsync(visitorsTextFileName));
                return numberOfVisitor;
            }
            else
            {
                return 0;
            }
        }
    }
}
