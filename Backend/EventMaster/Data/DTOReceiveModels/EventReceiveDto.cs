namespace EventMaster.Data.DTOReceiveModels
{
    public class EventReceiveDto
    {
        public int EventOrganizerID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal TicketPrice { get; set; }
        public int TicketsLeft { get; set; }
        public string EventDate { get; set; }
        public IFormFile Image { get; set; }

    }

}
