using System.ComponentModel.DataAnnotations;

namespace EventMaster.Data.Models
{
    public class Authentication
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set;}   
    }
}
