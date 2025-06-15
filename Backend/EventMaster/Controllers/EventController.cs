using EventMaster.Data.DTOReceiveModels;
using EventMaster.Data.DTOs_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public class EventController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public EventController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Authorize(Policy = "AdminOrOrganizer")]

    public async Task<IActionResult> GetEvents()
    {
        var events = await _context.Events
            .Include(e => e.Attachments)
            .Include(e => e.Status)
            .Include(e => e.EventOrganizer)
            .ToListAsync();

        var eventsDto = events.Select(ev => new EventDto
        {
            EventID = ev.EventID,
            EventOrganizerID = ev.EventOrganizerID,
            Title = AESEncryption.Decrypt(ev.Title).ToString(),
            Description = ev.Description,
            EventDate = ev.EventDate,
            TicketPrice = ev.TicketPrice,
            Location = ev.Location,
            TicketsLeft = ev.TicketsLeft,
            ParticipantsCount = ev.ParticipantsCount,
            Status = new StatusDto
            {
                StatusID = ev.Status.StatusId,
                StatusName = ev.Status.StatusName
            },
            EventOrganizerDto = new EventOrganizerDto
            {
                EventOrganizerID = ev.EventOrganizerID,
                Name = ev.EventOrganizer.Name,
                Email = ev.EventOrganizer.Email,
            },
            Image = ev.Attachments.FirstOrDefault()?.FilePath
        });

        return Ok(eventsDto);
    }

    [HttpGet("acceptedEvents")]
    //[Authorize(Policy = "AllAuthenticated")]
    public async Task<IActionResult> GetEventsAccepted()
    {
        var events = await _context.Events
            .Where(e => e.StatusId == 2)  // Filter first
            .Include(e => e.Attachments)
            .Include(e => e.Status)
            .Include(e => e.EventOrganizer)
            .ToListAsync();

        if (!events.Any())
        {
            return NotFound("No accepted events found");
        }

        var eventsDto = events.Select(ev => new EventDto
        {
            EventID = ev.EventID,
            EventOrganizerID = ev.EventOrganizerID,
            Title = AESEncryption.Decrypt(ev.Title).ToString(),
            Description = ev.Description,
            EventDate = ev.EventDate,
            TicketPrice = ev.TicketPrice,
            Location = ev.Location,
            TicketsLeft = ev.TicketsLeft,
            ParticipantsCount = ev.ParticipantsCount,
            Status = new StatusDto
            {
                StatusID = ev.Status.StatusId,
                StatusName = ev.Status.StatusName
            },
            EventOrganizerDto = new EventOrganizerDto
            {
                EventOrganizerID = ev.EventOrganizerID,
                Name = ev.EventOrganizer.Name,
                Email = ev.EventOrganizer.Email,
            },
            Image = ev.Attachments.FirstOrDefault()?.FilePath
        });

        return Ok(eventsDto);
    }

    [HttpGet("allevents/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Authorize(Policy = "AdminOrOrganizer")]
    public async Task<IActionResult> GetEventsForEventOrganizer(int id)
    {
        var events = await _context.Events
            .Include(e => e.Attachments)
            .Include(e => e.Status)
            .Include(e => e.EventOrganizer).Where(e=>e.EventOrganizerID ==id)
            .ToListAsync();
        var eventsDto = events.Select(ev => new EventDto
        {
            EventID = ev.EventID,
            EventOrganizerID = ev.EventOrganizerID,
            Title = AESEncryption.Decrypt(ev.Title).ToString(),
            Description = ev.Description,
            EventDate = ev.EventDate,
            TicketPrice = ev.TicketPrice,
            Location = ev.Location,
            TicketsLeft = ev.TicketsLeft,
            ParticipantsCount = ev.ParticipantsCount,
            Status = new StatusDto
            {
                StatusID = ev.Status.StatusId,
                StatusName = ev.Status.StatusName
            },
            EventOrganizerDto = new EventOrganizerDto
            {
                EventOrganizerID = ev.EventOrganizerID,
                Name = ev.EventOrganizer.Name,
                Email = ev.EventOrganizer.Email,
            },
            Image = ev.Attachments.FirstOrDefault()?.FilePath
        });

        return Ok(eventsDto);
    }
 
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    //[Authorize(Policy = "AllAuthenticated")]
    public async Task<IActionResult> GetEvent(int id)
    {
        var eventItem = await _context.Events
            .Include(e => e.EventOrganizer)
            .Include(e => e.Status)
            .Include(e => e.Attachments)
            .FirstOrDefaultAsync(e => e.EventID == id);

        if (eventItem == null) return NotFound();

        EventDto eventDto = new()
        {
            EventID = eventItem.EventID,
            EventOrganizerID = eventItem.EventOrganizerID,
            Title = AESEncryption.Decrypt(eventItem.Title).ToString(),
            Location = eventItem.Location,
            Description = eventItem.Description,
            EventDate = eventItem.EventDate,
            TicketPrice = eventItem.TicketPrice,
            TicketsLeft = eventItem.TicketsLeft,
            ParticipantsCount = eventItem.ParticipantsCount,
            Status = new StatusDto
            {
                StatusID = eventItem.Status.StatusId,
                StatusName = eventItem.Status.StatusName
            },
            EventOrganizerDto = new EventOrganizerDto
            {
                EventOrganizerID = eventItem.EventOrganizerID,
                Name = eventItem.EventOrganizer.Name,
                Email = eventItem.EventOrganizer.Email,
                StatusId = eventItem.EventOrganizer.StatusId,
            },
            Image = eventItem.Attachments.FirstOrDefault()?.FilePath
        };

        return Ok(eventDto);
    }

    [HttpGet("pending-events")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> GetPendingEvents()
    {
        var events = await _context.Events
            .Include(e => e.Attachments)
            .Include(e => e.Status)
            .Include(e => e.EventOrganizer)
            .Where(e => e.StatusId == 1)
            .ToListAsync();

        var eventsDto = events.Select(ev => new EventDto
        {
            EventID = ev.EventID,
            EventOrganizerID = ev.EventOrganizerID,
            Title = AESEncryption.Decrypt(ev.Title).ToString(),
            Description = ev.Description,
            EventDate = ev.EventDate,
            TicketPrice = ev.TicketPrice,
            Location = ev.Location,
            TicketsLeft = ev.TicketsLeft,
            ParticipantsCount = ev.ParticipantsCount,
            Status = new StatusDto
            {
                StatusID = ev.Status.StatusId,
                StatusName = ev.Status.StatusName
            },
            EventOrganizerDto = new EventOrganizerDto
            {
                EventOrganizerID = ev.EventOrganizerID,
                Name = ev.EventOrganizer.Name,
                Email = ev.EventOrganizer.Email,
            },
            Image = ev.Attachments.FirstOrDefault()?.FilePath
        });

        return Ok(eventsDto);
    }


    [HttpPost]
    [Authorize(Policy = "OrganizerOnly")]
    public async Task<IActionResult> CreateEvent([FromForm] EventReceiveDto newEvent)
    {
        if (newEvent.Image == null)
            return BadRequest(new { errors = new { Image = new[] { "The Image field is required." } } });

        if (!DateTime.TryParse(newEvent.EventDate, out DateTime parsedDate))
            return BadRequest("Invalid event date format");
        var encryptedTitle = AESEncryption.Encrypt(newEvent.Title).ToString();
        Event addedEvent = new Event
        {
            EventOrganizerID = newEvent.EventOrganizerID,
            Title = encryptedTitle,
            Description = newEvent.Description,
            Location = newEvent.Location,
            TicketPrice = newEvent.TicketPrice,
            TicketsLeft = newEvent.TicketsLeft,
            ParticipantsCount = 0,
            StatusId = 1,
            EventDate = parsedDate
        };

        await _context.Events.AddAsync(addedEvent);
        await _context.SaveChangesAsync();

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(newEvent.Image.FileName);
        var uploadsPath = Path.Combine(_env.WebRootPath, "uploads", "events");
        Directory.CreateDirectory(uploadsPath);
        var fullPath = Path.Combine(uploadsPath, fileName);

        using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await newEvent.Image.CopyToAsync(stream);
        }

        Attachment attachment = new()
        {
            EventID = addedEvent.EventID,
            FilePath = "https://localhost:7024/uploads/events/" + fileName
        };

        _context.Attachments.Add(attachment);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Event added successfully", EventID = addedEvent.EventID });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "AdminOrOrganizer")]
    public async Task<IActionResult> UpdateEvent(int id, [FromBody] UpdateEventDto eventDto)
    {
        if (id != eventDto.EventID)
            return BadRequest("ID mismatch");

        var existingEvent = await _context.Events.FindAsync(id);
        if (existingEvent == null)
            return NotFound();

        existingEvent.Title = AESEncryption.Encrypt(eventDto.Title).ToString();
        existingEvent.Description = eventDto.Description;
        existingEvent.Location = eventDto.Location;
        existingEvent.TicketPrice = eventDto.TicketPrice;
        existingEvent.TicketsLeft = eventDto.TicketsLeft;
        existingEvent.EventDate = eventDto.EventDate;
        existingEvent.EventOrganizerID = eventDto.EventOrganizerID;

        await _context.SaveChangesAsync();
        return Ok("Event updated successfully");
    }



    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOrOrganizer")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null) return NotFound();

        
        var attachments = await _context.Attachments.Where(a => a.EventID == id).ToListAsync();
        foreach (var attachment in attachments)
        {
            var filePath = Path.Combine(_env.WebRootPath, attachment.FilePath.TrimStart('/'));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            _context.Attachments.Remove(attachment);
        }

        _context.Events.Remove(eventItem);
        await _context.SaveChangesAsync();
        return Ok("Event Deleted Successfully");
    }

    

}
public class UpdateEventDto
    {
        public int EventID { get; set; }
        public int EventOrganizerID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal TicketPrice { get; set; }
        public int TicketsLeft { get; set; }
        public DateTime EventDate { get; set; }
    }

