using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;


public class AdminDto
{
    [Key]
    public int AdminID { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Role => "Admin";
}
