using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Notification
{
    [Key]
    public int NotificationID { get; set; }

    [Required]
    public string Message { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.UtcNow; // 🕒 Default timestamp

    [Required]
    public int ParticipantID { get; set; }

    public int? EventID { get; set; }

    public bool IsRead { get; set; } = false;

    [ForeignKey("ParticipantID")]
    public Participant Participant { get; set; }

    [ForeignKey("EventID")]
    public Event Event { get; set; }
}
