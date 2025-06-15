using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Participant
{
    public Participant()
    {
        Role = "Participant"; // Default role
    }

    [Key]
    public int ParticipantID { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; }

    [Required, MaxLength(100)]
    public string Email { get; set; }

    [Required, MaxLength(255)]
    public string PasswordHash { get; set; }

    public string Role { get; set; }

    public ICollection<Registration>? Registrations { get; set; } = new List<Registration>();
    public ICollection<SavedEvent>? SavedEvents { get; set; } = new List<SavedEvent>();
    public ICollection<Notification>? Notifications { get; set; } = new List<Notification>();
}

