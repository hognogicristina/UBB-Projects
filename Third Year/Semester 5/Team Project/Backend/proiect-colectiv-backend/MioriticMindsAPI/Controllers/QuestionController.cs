using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MioriticMindsAPI.Models;
using MioriticMindsAPI.Repository;
using MioriticMindsAPI.Validation;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json.Linq;
using static System.Net.Mime.MediaTypeNames;

namespace MioriticMindsAPI.Controllers
{
    [Route("api/Questions")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly MioriticMindsDbContext _dbContext;

        public QuestionController(MioriticMindsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("randomPersonSumary")]
        [AllowAnonymous]
        public async Task<IActionResult> PostRandomPersonSummary()
        {
            var random = new Random();
            int skipper = random.Next(0, _dbContext.Persons.Count());

            var person = await _dbContext.Persons
                .Skip(skipper)
                .Take(1)
                .FirstOrDefaultAsync();

            if (person == null)
            {
                return NotFound("No persons found in the database.");
            }

            var nameForApi = person.Name.Replace(" ", "%20");

            var url = $"https://en.wikipedia.org/api/rest_v1/page/summary/{nameForApi}";

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    JObject obj = JObject.Parse(data);
                    string summary = (string)obj["extract"];
                    summary = summary.Replace("\n", " ");
                    summary = summary.Replace("\\\"", "");
                    string censoredText = summary;
                    string pronoun = person.IsFemale ? "She" : "He";

                    string withoutprincequeenking = person.Name;
                    withoutprincequeenking = withoutprincequeenking.Replace("King", "");
                    withoutprincequeenking = withoutprincequeenking.Replace("Queen", "");
                    withoutprincequeenking = withoutprincequeenking.Replace("Prince", "");

                    censoredText = censoredText.Replace(withoutprincequeenking, pronoun);

                    List<Person> otherPeople = new List<Person>();
                    while (otherPeople.Count < 3)
                    {
                        skipper = random.Next(0, _dbContext.Persons.Count());
                        var people = await _dbContext.Persons
                            .Where(x => x.IsFemale == person.IsFemale && x.Id != person.Id)
                            .Skip(skipper)
                            .Take(3 - otherPeople.Count)
                            .ToListAsync();
                        otherPeople.AddRange(people);
                    }

                    var result = new
                    {
                        Summary = censoredText,
                        Name = person.Name,
                        OtherPeople = otherPeople.Select(x => x.Name).ToList()
                    };

                    return Ok(result);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Error occurred while calling the Wikipedia API.");
                }
            }
        }

        [HttpPost("randomPersonImage")]
        [AllowAnonymous]
        public async Task<IActionResult> PostRandomPersonImage()
        {
            var random = new Random();
            int skipper;
            Person person = null;
            string imageURL = null;

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                while (imageURL == null)
                {
                    skipper = random.Next(0, _dbContext.Persons.Count());
                    person = await _dbContext.Persons
                        .Skip(skipper)
                        .Take(1)
                        .FirstOrDefaultAsync();

                    if (person == null)
                    {
                        return NotFound("No persons found in the database.");
                    }

                    var nameForApi = person.Name.Replace(" ", "%20");
                    var url = $"https://en.wikipedia.org/api/rest_v1/page/media-list/{nameForApi}";
                    var response = await httpClient.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        var data = await response.Content.ReadAsStringAsync();
                        JObject obj = JObject.Parse(data);
                        JToken firstItem = obj["items"]?.FirstOrDefault();
                        if (firstItem != null && firstItem["srcset"]?.FirstOrDefault()?["src"] != null)
                        {
                            imageURL = (string)firstItem["srcset"].FirstOrDefault()["src"];
                        }
                    }
                    else
                    {
                        return StatusCode((int)response.StatusCode, "Error occurred while calling the Wikipedia API.");
                    }
                }
            }

            List<Person> otherPeople = new List<Person>();
            while (otherPeople.Count < 3)
            {
                skipper = random.Next(0, _dbContext.Persons.Count());
                var people = await _dbContext.Persons
                    .Where(x => x.IsFemale == person.IsFemale && x.Id != person.Id)
                    .Skip(skipper)
                    .Take(3 - otherPeople.Count)
                    .ToListAsync();
                otherPeople.AddRange(people);
            }

            var result = new
            {
                Summary = imageURL,
                Name = person.Name,
                OtherPeople = otherPeople.Select(x => x.Name).ToList()
            };

            return Ok(result);
        }
    }
}