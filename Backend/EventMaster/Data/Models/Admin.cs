using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;


public class Admin
{
    public Admin()
    {
        Role = "Admin"; // Default role
    }

    [Key]
    public int AdminID { get; set; }

    [Required, MaxLength(100)]
    public string Username { get; set; }

    [Required, MaxLength(255)]
    public string PasswordHash { get; set; }

    [Required, MaxLength(100)]
    public string Email { get; set; }

    public string? Role { get; set; }
}
