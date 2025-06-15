using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class EventOrganizerDto
{
    public int? EventOrganizerID { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? PasswordHash { get; set; }

    public int? StatusId { get; set; }

    public string Role => "EventOrganizer";
}

