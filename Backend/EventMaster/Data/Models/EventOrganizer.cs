using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class EventOrganizer
{
    public EventOrganizer()
    {
        Role = "EventOrganizer"; // Default role
    }

    [Key]
    public int EventOrganizerID { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; }

    [Required, MaxLength(100)]
    public string Email { get; set; }

    [Required, MaxLength(255)]
    public string PasswordHash { get; set; }

    [Required]
    public int StatusId { get; set; }

    [ForeignKey("StatusId")]
    public Status? Status { get; set; }

    public ICollection<Event>? Events { get; set; } = new List<Event>();

    public string Role { get; set; }
}
