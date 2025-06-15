using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Event
{
    [Key]
    public int EventID { get; set; }

    [Required]
    public int EventOrganizerID { get; set; }

    [ForeignKey("EventOrganizerID")]
    public EventOrganizer? EventOrganizer { get; set; }

    [Required, MaxLength(255)]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required, MaxLength(255)]
    public string Location { get; set;}
    [Required]
    public DateTime EventDate { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TicketPrice { get; set; }

    [Required]
    public int TicketsLeft { get; set; }

    public int ParticipantsCount { get; set; }

    [Required]
    public int StatusId { get; set; }

    [ForeignKey("StatusId")]
    public Status? Status { get; set; }

    public ICollection<Registration>? Registrations { get; set; } = new List<Registration>();
    public ICollection<SavedEvent>? SavedEvents { get; set; } = new List<SavedEvent>();
    public ICollection<Attachment>? Attachments { get; set; } = new List<Attachment>();
    public ICollection<Notification>? Notifications { get; set; } = new List<Notification>();
}
