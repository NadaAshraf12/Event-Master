using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Attachment
{
    [Key]
    public int AttachmentID { get; set; }

    [Required]
    public int EventID { get; set; }

    [ForeignKey("EventID")]
    public Event? Event { get; set; }

    [Required, MaxLength(255)]
    public string FilePath { get; set; }
}
