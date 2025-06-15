using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Status
{
    [Key]
    public int StatusId { get; set; }

    [Required, MaxLength(100)]
    [Display(Name = "Status Name")]
    public string StatusName { get; set; }

    public ICollection<Event> Events { get; set; } = new List<Event>();
    public ICollection<EventOrganizer> EventOrganizers { get; set; } = new List<EventOrganizer>();
}
