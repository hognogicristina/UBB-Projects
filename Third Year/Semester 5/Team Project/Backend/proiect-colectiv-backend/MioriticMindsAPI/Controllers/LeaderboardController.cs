using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MioriticMindsAPI.Models;
using MioriticMindsAPI.Repository;
using System.Linq;

namespace MioriticMindsAPI.Controllers
{
    [Route("api/Leaderboard")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private readonly MioriticMindsDbContext _dbContext;

        public LeaderboardController(MioriticMindsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [AllowAnonymous]
        [HttpGet("mixed")]
        public IActionResult GetMixedLeaderboard()
        {
            var users = _dbContext.Users.ToList();

            var leaderboard = users
                .OrderByDescending(u => u.HighScoreMixed)
                .Select(u => new { UserName = u.UserName, Score = u.HighScoreMixed })
                .ToList();

            return Ok(leaderboard);
        }

        [AllowAnonymous]
        [HttpGet("mixed/{username}")]
        public IActionResult GetUserInMixedLeaderboard(string username)
        {
            var users = _dbContext.Users.ToList();
            var user = users.FirstOrDefault(u => u.UserName == username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var position = users
                .OrderByDescending(u => u.HighScoreMixed)
                .ToList()
                .FindIndex(u => u.UserName == username) + 1;

            var result = new { Position = position, Score = user.HighScoreMixed };
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("photos")]
        public IActionResult GetPhotosLeaderboard()
        {
            var users = _dbContext.Users.ToList();

            var leaderboard = users
                .OrderByDescending(u => u.HighScorePhotos)
                .Select(u => new { UserName = u.UserName, Score = u.HighScorePhotos })
                .ToList();

            return Ok(leaderboard);
        }

        [AllowAnonymous]
        [HttpGet("photos/{username}")]
        public IActionResult GetUserInPhotosLeaderboard(string username)
        {
            var users = _dbContext.Users.ToList();
            var user = users.FirstOrDefault(u => u.UserName == username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var position = users
                .OrderByDescending(u => u.HighScorePhotos)
                .ToList()
                .FindIndex(u => u.UserName == username) + 1;

            var result = new { Position = position, Score = user.HighScorePhotos };
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("text")]
        public IActionResult GetTextLeaderboard()
        {
            var users = _dbContext.Users.ToList();

            var leaderboard = users
                .OrderByDescending(u => u.HighScoreText)
                .Select(u => new { UserName = u.UserName, Score = u.HighScoreText })
                .ToList();

            return Ok(leaderboard);
        }

        [AllowAnonymous]
        [HttpGet("text/{username}")]
        public IActionResult GetUserInTextLeaderboard(string username)
        {
            var users = _dbContext.Users.ToList();
            var user = users.FirstOrDefault(u => u.UserName == username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var position = users
                .OrderByDescending(u => u.HighScoreText)
                .ToList()
                .FindIndex(u => u.UserName == username) + 1;

            var result = new { Position = position, Score = user.HighScoreText };
            return Ok(result);
        }
    }
}
