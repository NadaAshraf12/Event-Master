using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EventMaster.Data.DTOs_Models;


public class EventDto
{
    public int EventID { get; set; }
    public int EventOrganizerID { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public DateTime EventDate { get; set; }
    public decimal TicketPrice { get; set; }
    public int TicketsLeft { get; set; }
    public int ParticipantsCount { get; set; }
    public StatusDto Status { get; set; }
    public string Image { get; set; }
    public int? StatusID { get; set; }
    public EventOrganizerDto EventOrganizerDto {get;set;}
}
