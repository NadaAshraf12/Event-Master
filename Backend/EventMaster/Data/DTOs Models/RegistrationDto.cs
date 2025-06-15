using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class RegistrationDto
{
    public int RegistrationID { get; set; }
    public int ParticipantID { get; set; }
    public int EventID { get; set; }
    public int PaymentMethodId { get; set; }
}
