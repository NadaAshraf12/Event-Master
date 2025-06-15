using EventMaster.Data.DTOs_Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;


[Route("api/[controller]")]
[ApiController]

public class EventOrganizerController : ControllerBase
{
    private readonly AppDbContext _context;

    public EventOrganizerController(AppDbContext context)
    {
        _context = context;
    }
    [HttpPost]


    public async Task<IActionResult> CreateOrganizer([FromBody] EventOrganizer eventOrganizer, bool fromAdmin = false)
    {
        if (eventOrganizer == null)
            return BadRequest("Invalid data");

        eventOrganizer.Role = "EventOrganizer";
        eventOrganizer.PasswordHash = HashHelper.ComputeHash(eventOrganizer.PasswordHash);
        eventOrganizer.StatusId = fromAdmin ? 2 : 1;

        var isFound = await _context.EventOrganizers
            .FirstOrDefaultAsync(e => e.Email == (eventOrganizer.Email));

        if (isFound != null)
            return BadRequest(new { Message = "Organizer Already registered"});

        await _context.EventOrganizers.AddAsync(eventOrganizer);
        await _context.SaveChangesAsync();
        EventOrganizerDto eventOrganizerDto = new()
        {
            EventOrganizerID = eventOrganizer.EventOrganizerID,
            Name = eventOrganizer.Name,
            Email = eventOrganizer.Email,
            StatusId = eventOrganizer.StatusId,
        };

        return Ok(new { Message = "Organizer created successfully", eventOrganizerDto.EventOrganizerID });
    }

    [HttpGet]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> GetAllOrganizers()
    {
        var eventorganizers = await _context.EventOrganizers.ToListAsync();
        var eventOrganizersDtos = eventorganizers.Select(eventOrganizer => new EventOrganizerDto
        {
            EventOrganizerID = eventOrganizer.EventOrganizerID,
            Name = eventOrganizer.Name,
            Email = eventOrganizer.Email,
            StatusId = eventOrganizer.StatusId,
        }).ToList();
        return Ok(eventOrganizersDtos);
    }

    [HttpGet("pending-organizers")]
    [Authorize(Policy = "AdminOnly")]

    public async Task<IActionResult> GetPendingOrganizers()
    {
        var eventorganizers = await _context.EventOrganizers.Where(e=>e.StatusId ==1).ToListAsync();
        var eventOrganizersDtos = eventorganizers.Select(eventOrganizer => new EventOrganizerDto
        {
            EventOrganizerID = eventOrganizer.EventOrganizerID,
            Name = eventOrganizer.Name,
            Email = eventOrganizer.Email,
            StatusId = eventOrganizer.StatusId,
        }).ToList();
        return Ok(eventOrganizersDtos);
    }

    // READ BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrganizerById(int id)
    {
        var eventorganizer = await _context.EventOrganizers.FindAsync(id);
        if (eventorganizer == null)
            return NotFound("Organizer not found");
        return Ok(eventorganizer);
    }

    // UPDATE
    [HttpPut("{id}")]
    [Authorize(Policy = "OrganizerOnly")]

    public async Task<IActionResult> UpdateOrganizer(int id, [FromBody] EventOrganizerDto updatedOrganizer)
    {
        if (id != updatedOrganizer.EventOrganizerID)
            return BadRequest("ID mismatch");

        var existingOrganizer = await _context.EventOrganizers.FindAsync(id);
        if (existingOrganizer == null)
            return NotFound("Organizer not found");

        existingOrganizer.Name = updatedOrganizer.Name;
        existingOrganizer.Email = updatedOrganizer.Email;
        existingOrganizer.PasswordHash = existingOrganizer.PasswordHash;
        existingOrganizer.StatusId = (int)updatedOrganizer.StatusId;
        existingOrganizer.Role= updatedOrganizer.Role;

        await _context.SaveChangesAsync();
        return Ok("Organizer updated successfully");
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]

    public async Task<IActionResult> DeleteOrganizer(int id)
    {
        var organizer = await _context.EventOrganizers.FindAsync(id);
        if (organizer == null)
            return NotFound("Organizer not found");

        _context.EventOrganizers.Remove(organizer);
        await _context.SaveChangesAsync();

        return Ok("Organizer deleted successfully");
    }


    [HttpPost("change-password/{id}")]
    [Authorize(Policy = "OrganizerOnly")]

    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto request, [FromHeader] int id)
    {
        var eventOrganizer = await _context.EventOrganizers.SingleOrDefaultAsync(e => e.EventOrganizerID == id);

        if (eventOrganizer == null)
        {
            return NotFound("Event organizer not found.");
        }

        if (!HashHelper.VerifyHash(request.OldPassword, eventOrganizer.PasswordHash))
        {
            return BadRequest("Old password is incorrect.");
        }

        if (HashHelper.VerifyHash(request.NewPassword, eventOrganizer.PasswordHash))
        {
            return BadRequest("New password must be different from the old password.");
        }

        eventOrganizer.PasswordHash = HashHelper.ComputeHash(request.NewPassword);
        await _context.SaveChangesAsync();

        return Ok("Password changed successfully.");
    }



}
