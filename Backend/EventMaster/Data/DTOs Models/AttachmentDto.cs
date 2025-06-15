using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class AttachmentDto
{
    public int AttachmentID { get; set; }

    public string FilePath { get; set; }

}
