using System.ComponentModel.DataAnnotations;

namespace EventMaster.Data.DTOReceiveModels
{
    public class RegistrationDtoReceiver
    {
        [Key]
        public int RegistrationId { get; set; }

        public int ParticipantID { get; set; }

        public int EventID { get; set; }
    }
}
