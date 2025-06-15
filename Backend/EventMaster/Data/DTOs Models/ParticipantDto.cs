using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ParticipantDto
{
    public int ParticipantID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Role => "Participant";
}
