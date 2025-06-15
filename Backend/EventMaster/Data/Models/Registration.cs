using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Registration
{
    [Key]
    public int RegistrationID { get; set; }

    [Required]
    public int ParticipantID { get; set; }
    public Participant? Participant { get; set; }

    [Required]
    public int EventID { get; set; }
    public Event? Event { get; set; }

    [Required, ForeignKey("Payment Method")]
    public int PaymentMethodId { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }
}