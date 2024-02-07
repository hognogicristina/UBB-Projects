using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MioriticMindsAPI.Models;
using MioriticMindsAPI.Repository;
using MioriticMindsAPI.Validation;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MioriticMindsAPI.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MioriticMindsDbContext _dbContext;
        private readonly JwtSetter _jwtSetter;
        private readonly UserValidator _validator;

        public UserController(MioriticMindsDbContext dbContext, IOptions<JwtSetter> JwtSetter)
        {
            _dbContext = dbContext;
            _jwtSetter = JwtSetter.Value;
            _validator = new UserValidator();
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSetter.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_dbContext.Users == null)
                return NotFound();

            return await _dbContext.Users.ToListAsync();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Login(UserDTO User)
        {
            if (User.Username == null || User.Password == null)
                return BadRequest();

            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => u.UserName == User.Username && u.Password != null && u.Password == User.Password);

            if (user == null)
                return Unauthorized("!ERROR! Invalid username or password!");

            var token = GenerateJwtToken(user);
            user.Password = null;

            return new
            {
                user,
                token
            };
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Register(UserDTO userDTO)
        {
            var validationResult = _validator.ValidateRegister(userDTO);
            if (validationResult != string.Empty)
                return BadRequest(validationResult);

            if (await _dbContext.Users.AnyAsync(u => u.UserName == userDTO.Username))
                return BadRequest("Username is already taken.");

            var newUser = new User
            {
                UserName = userDTO.Username,
                Password = userDTO.Password,
                HighScoreMixed = 0,
                HighScorePhotos = 0,
                HighScoreText = 0
            };

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();

            var token = GenerateJwtToken(newUser);
            newUser.Password = null;

            return new
            {
                newUser,
                token
            };
        }

        [HttpPut("mixed/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> UpdateMixedHighScore(string username, int newHighScore)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (user == null)
                return NotFound();

            if (newHighScore > user.HighScoreMixed)
            {
                user.HighScoreMixed = newHighScore;
                await _dbContext.SaveChangesAsync();
            }

            return user;
        }

        [HttpPut("photos/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> UpdatePhotosHighScore(string username, int newHighScore)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (user == null)
                return NotFound();

            if (newHighScore > user.HighScorePhotos)
            {
                user.HighScorePhotos = newHighScore;
                await _dbContext.SaveChangesAsync();
            }

            return user;
        }

        [HttpPut("text/{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> UpdateTextHighScore(string username, int newHighScore)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (user == null)
                return NotFound();

            if (newHighScore > user.HighScoreText)
            {
                user.HighScoreText = newHighScore;
                await _dbContext.SaveChangesAsync();
            }

            return user;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> GetUserById(int id)
        {
            if (_dbContext == null)
            {
                return NotFound();
            }

            var userToReturn = await _dbContext.Users.SingleOrDefaultAsync(x => x.Id == id);
            if (userToReturn == null)
            {
                return NotFound();
            }

            var userName = userToReturn.UserName;
            if (userName == null)
            {
                return NotFound();
            }
            return userName;

        }
        [HttpPut("UpdateHighScore")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> UpdateUserHighScore(int id, UserScoreDTO userDto)
        {
            var userToUpdate = await _dbContext.Users.FindAsync(id);
            if (userToUpdate == null)
            {
                return BadRequest();
            }
            userToUpdate.HighScoreMixed = userDto.HighScoreMixed;
            userToUpdate.HighScorePhotos = userDto.HighScorePhotos;
            userToUpdate.HighScoreText = userDto.HighScoreText;

            await _dbContext.SaveChangesAsync();

            return userToUpdate;
        }

        [HttpPut("UpdateUsername/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> UpdateUsername([FromRoute] int id, [FromBody] UsernameDTO newUsername)
        {
            int length = _dbContext.Users.Count();
            for (int i = 1; i < length + 1; i++)
            {
                var toCheck = await _dbContext.Users.FindAsync(id);
                if (toCheck == null)
                {
                    continue;
                }
                if (toCheck.UserName == newUsername.Username)
                {
                    return BadRequest();
                }
            }
            var userToUpdate = await _dbContext.Users.FindAsync(id);
            if (userToUpdate == null)
            {
                return BadRequest();
            }
            userToUpdate.UserName = newUsername.Username;

            await _dbContext.SaveChangesAsync();

            return userToUpdate;
        }

        [HttpPut("UpdatePassword/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> UpdatePassword([FromRoute] int id, [FromBody] PasswordDTO newPassword)
        {

            var userToUpdate = await _dbContext.Users.FindAsync(id);
            if (userToUpdate == null)
            {
                return BadRequest();
            }
            userToUpdate.Password = newPassword.Password;

            await _dbContext.SaveChangesAsync();

            return userToUpdate;
        }
    }
}
