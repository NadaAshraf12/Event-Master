using EventMaster.Data.DTOs_Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace EventMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "AdminOrParticipant")]

    public class ParticipantController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ParticipantController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]

        public async Task<IActionResult> GetAllParticipants()
        {
            var Participants = await _context.Participants.ToListAsync();
            var ParticipantsDto = Participants.Select(participant => new ParticipantDto
            {
                ParticipantID = participant.ParticipantID,
                Name = participant.Name,
                Email = participant.Email,
            });


            return Ok(ParticipantsDto);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public async Task<IActionResult> GetParticipantById(int id)
        {
            var participant = await _context.Participants
                .Include(p => p.Registrations)
                .Include(p => p.SavedEvents)
                .Include(p => p.Notifications)
                .FirstOrDefaultAsync(p => p.ParticipantID == id);

            if (participant == null)
                return NotFound();

            ParticipantDto participantDto = new()
            {
                ParticipantID = participant.ParticipantID,
                Email = participant.Email,
                Name = participant.Name

            };
            return Ok(participantDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateParticipant(Participant newParticipant)
        {
            var participant = await _context.Participants.SingleOrDefaultAsync(p => p.Email == newParticipant.Email);

            if (participant != null)
                return BadRequest("Email already registered.");

            newParticipant.PasswordHash = HashHelper.ComputeHash(newParticipant.PasswordHash);
            await _context.Participants.AddAsync(newParticipant);
            await _context.SaveChangesAsync();

            ParticipantDto participantDto = new()
            {
                ParticipantID = newParticipant.ParticipantID,
                Name = newParticipant.Name,
                Email = newParticipant.Email,
            };
            return Ok(participantDto);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "ParticipantOnly")]

        public async Task<IActionResult> UpdateParticipant(int id, Participant updatedParticipant)
        {
            if (id != updatedParticipant.ParticipantID)
                return BadRequest("id doesn't match");

            try
            {
                var participant = await _context.Participants.SingleOrDefaultAsync(p => p.ParticipantID == id);
                if (participant == null)
                    return NotFound("not found");
                else
                {
                    participant.ParticipantID = updatedParticipant.ParticipantID;
                    participant.Name = updatedParticipant.Name;
                    participant.Email = updatedParticipant.Email;
                    participant.Role = updatedParticipant.Role;
                    await _context.SaveChangesAsync();
                    return Ok("data updated successfully");
                }

            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Policy = "ParticipantOnly")]

        public async Task<IActionResult> DeleteParticipant(int id)
        {
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null)
                return NotFound("not found");
            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();
            return Ok("product deleted successfully");
        }

        [HttpGet("saved-events/{id}")]
        [Authorize(Policy = "ParticipantOnly")]

        public async Task<IActionResult> GetSavedEvents([FromHeader] int id)
        {
            var savedEvents = await _context.SavedEvents.Include(e => e.Event).ToListAsync();
            var savedEventsDto = savedEvents.Select(ev => new SavedEventDto
            {
                SavedID = ev.SavedID,
               EventId = ev.EventID,
                Title = ev.Event.Title,
                EventDate = ev.Event.EventDate.ToString()
            });

            return Ok(savedEventsDto);
        }

        [HttpPost("change-password/{id}")]
        [Authorize(Policy = "ParticipantOnly")]

        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto request, [FromHeader] int id)
        {
            var participant = await _context.Participants.SingleOrDefaultAsync(e => e.ParticipantID == id);

            if (participant == null)
            {
                return NotFound("Participant not found.");
            }

            if (!HashHelper.VerifyHash(request.OldPassword, participant.PasswordHash))
            {
                return BadRequest("Old password is incorrect.");
            }

            if (HashHelper.VerifyHash(request.NewPassword, participant.PasswordHash))
            {
                return BadRequest("New password must be different from the old password.");
            }

            participant.PasswordHash = HashHelper.ComputeHash(request.NewPassword);
            await _context.SaveChangesAsync();

            return Ok("Password changed successfully.");
        }

    }
}
