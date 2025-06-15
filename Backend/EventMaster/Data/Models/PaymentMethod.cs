using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class PaymentMethod
{
    [Key]
    public int PaymentMethodId { get; set; }

    [Required, MaxLength(100)]
    public string PaymentMethodName { get; set; }

    public ICollection<Registration> Registrations { get; set; }
}
