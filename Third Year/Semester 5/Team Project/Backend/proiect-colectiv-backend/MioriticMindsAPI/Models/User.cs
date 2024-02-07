namespace MioriticMindsAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int HighScoreMixed { get; set; }
        public int HighScorePhotos { get; set; }
        public int HighScoreText { get; set; }
    }
}
