using EventMaster.Data.DTOReceiveModels;
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
    [Authorize]

    public class RegistrationController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RegistrationController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<IEnumerable<RegistrationDto>>> GetAllRegistrations()
        {
            var registerations = await _context.Registrations
                .Include(r => r.Participant)
                .Include(r => r.Event)
                .ToListAsync();
            var registraionDto = registerations.Select(reg => new RegistrationDto
            {
                RegistrationID = reg.RegistrationID,
                ParticipantID = reg.ParticipantID,
                EventID = reg.EventID,
                PaymentMethodId = reg.PaymentMethodId
            });

            return Ok(registraionDto);
                        }
        [HttpGet("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public async Task<IActionResult> GetRegistrationById(int id)
        {
            var registration = await _context.Registrations
                .Include(r => r.Participant)
                .Include(r => r.Event)
                .FirstOrDefaultAsync(r => r.RegistrationID == id);
            if (registration == null)
                return NotFound();
            RegistrationDto registrationDto = new() { 
            RegistrationID=registration.RegistrationID,
            ParticipantID=registration.ParticipantID,
            EventID=registration.EventID,
            PaymentMethodId=registration.PaymentMethodId
            };

            return Ok(registrationDto);
        }
        [HttpPost]
        [Authorize(Policy = "ParticipantOnly")]
        public async Task<IActionResult> CreateRegistration(Registration registration)
        {
            var isRegistered = await _context.Registrations
                .SingleOrDefaultAsync(e => e.ParticipantID == registration.ParticipantID && e.EventID == registration.EventID);

            if (isRegistered != null)
                return BadRequest("This account has already registered.");

            var selectedEvent = await _context.Events
                .SingleOrDefaultAsync(e => e.EventID == registration.EventID);

            if (selectedEvent == null)
                return NotFound("Event not found.");

            if (selectedEvent.TicketsLeft <= 0)
                return Ok("Sorry, there are no tickets left.");

            selectedEvent.TicketsLeft--;

            await _context.Registrations.AddAsync(registration);
            await _context.SaveChangesAsync();

            return Ok("You're successfully registered.");
        }


        [HttpPut("{id}")]
        [Authorize(Policy = "ParticipantOnly")]

        public async Task<IActionResult> UpdateRegistration(int id, Registration updated)
        {
            if (id != updated.RegistrationID)
                return BadRequest("id doesn't match");

            var registeration = await _context.Registrations.SingleOrDefaultAsync(e=>e.RegistrationID == id);
            
            if (id != updated.RegistrationID)
                return BadRequest();

            registeration.RegistrationID = updated.RegistrationID;
            registeration.EventID = updated.EventID;
            registeration.PaymentMethodId = updated.PaymentMethodId;
         
            await _context.SaveChangesAsync();
            return Ok("Updated successfully");
         
        }
        [HttpDelete("{id}")]
        [Authorize(Policy = "ParticipantOnly")]

        public async Task<IActionResult> DeleteRegistration(int id)
        {
            var registration = await _context.Registrations.FindAsync(id);
            var Event = await _context.Events.SingleOrDefaultAsync(e=>e.EventID == id);
            Event.TicketsLeft += 1;
            if (registration == null)
                return NotFound();
            _context.Registrations.Remove(registration);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        

    }
}
