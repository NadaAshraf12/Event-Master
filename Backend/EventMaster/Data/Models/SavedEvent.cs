using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class SavedEvent
{
    [Key]
    public int SavedID { get; set; }

    [Required]
    public int ParticipantID { get; set; }
    public Participant Participant { get; set; }

    [Required , ForeignKey("Event ID")]
    public int EventID { get; set; }
    public Event Event { get; set; }
}
