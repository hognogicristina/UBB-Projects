using MioriticMindsAPI.Models;

namespace MioriticMindsAPI.Validation
{
    public class UserValidator
    {
        public UserValidator() { }

        public string ValidateRegister(UserDTO user)
        {
            List<string> errors = new();

            if (user == null)
                return "User must not be null.";

            if (user.Username == null || user.Username.Length < 3)
                errors.Add("UserName must have a length greater than 2 characters.");

            if (user.Password == null || user.Password.Length < 8)
                errors.Add("Password must contain at least 8 characters.");
            if (user.Password == null || !user.Password.Any(char.IsLetter) || !user.Password.Any(char.IsDigit))
                errors.Add("Password must contain at least a letter and a number.");

            return string.Join("\n", errors);
        }
    }
}
