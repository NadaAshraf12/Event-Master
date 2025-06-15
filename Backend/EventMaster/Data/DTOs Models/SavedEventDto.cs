using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class SavedEventDto
{
    public int SavedID { get; set; } 
    public int EventId { get; set; }
    public string EventDate { get; set; }
    public string Title { get; set; }
}