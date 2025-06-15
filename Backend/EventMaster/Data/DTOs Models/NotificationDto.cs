using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class NotificationDto
{
    [Key]
    public int NotificationID { get; set; }

    public string Message { get; set; }

    public int ParticipantID { get; set; }

    public int EventID { get; set; }
}
