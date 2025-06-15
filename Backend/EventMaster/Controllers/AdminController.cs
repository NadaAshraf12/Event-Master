using EventMaster.Data.DTOs_Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[Authorize(Policy = "AdminOnly")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAdmin(Admin admin)
    {
        try
        {
            Admin newAdmin = new()
            {
                Email = admin.Email,
                Username = admin.Username,
                PasswordHash = HashHelper.ComputeHash(admin.PasswordHash),
                Role = "Admin"
            };
            await _context.Admins.AddAsync(newAdmin);
            await _context.SaveChangesAsync();

            AdminDto newAdminDto = new()
            {
                Email = newAdmin.Email,
                Username = admin.Username,
            };

            return CreatedAtAction(nameof(GetAdmin), new { id = newAdmin.AdminID }, newAdminDto);
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Something went wrong while creating admin." });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAdmin(int id)
    {
        try
        {
            var admin = await _context.Admins.SingleOrDefaultAsync(e => e.AdminID == id);
            if (admin == null)
                return NotFound(new { message = "Admin not found." });

            AdminDto adminDto = new()
            {
                AdminID = admin.AdminID,
                Email = admin.Email,
                Username = admin.Username,
            };

            return Ok(adminDto);
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Something went wrong while retrieving admin." });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAdmins()
    {
        try
        {
            var admins = await _context.Admins.ToListAsync();

            var adminDtos = admins.Select(admin => new AdminDto
            {
                AdminID = admin.AdminID,
                Username = admin.Username,
                Email = admin.Email,
            }).ToList();

            return Ok(adminDtos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Something went wrong while retrieving admins.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAdmin([FromBody] Admin newAdmin, int id)
    {
        if (newAdmin.AdminID != id)
            return BadRequest(new { message = "Admin ID doesn't match." });

        var admin = await _context.Admins.FirstOrDefaultAsync(e => e.AdminID == id);
        if (admin == null)
            return NotFound(new { message = "Admin not found." });

        admin.Username = newAdmin.Email;
        _context.SaveChanges();

        AdminDto adminDto = new()
        {
            AdminID = admin.AdminID,
            Username = admin.Username,
            Email = admin.Email,
        };

        return Ok(adminDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAdmin([FromHeader] int id)
    {
        var admin = await _context.Admins.FirstOrDefaultAsync(e => e.AdminID == id);

        if (admin == null)
            return NotFound(new { message = $"Admin with Id {id} not found." });

        _context.Admins.Remove(admin);
        await _context.SaveChangesAsync();

        return Ok(new { message = $"Admin with Id {id} has been successfully removed." });
    }

    [HttpPost("approve-organizer/{id}")]
    public async Task<IActionResult> ApproveOrganizer(int id)
    {
        var eventOrganizer = await _context.EventOrganizers.FirstOrDefaultAsync(e=>e.EventOrganizerID ==id);
        if (eventOrganizer == null)
            return NotFound(new { message = "Event Organizer not found." });

        eventOrganizer.StatusId = 2;
        await _context.SaveChangesAsync();

        return Ok(new { message = $"Event Organizer has been approved successfully"});
    }

    [HttpPost("approve-event/{id}")]
    public async Task<IActionResult> ApproveEvent(int id)
    {
        var eventItem = await _context.Events.SingleOrDefaultAsync(e=> e.EventID == id);
        if (eventItem == null)
            return NotFound(new { message = "Event not found." });

        eventItem.StatusId = 2;
        await _context.SaveChangesAsync();
        return Ok(new { message = "Event has been approved", eventItem });
    }
    
    
    [HttpPost("change-password/{id}")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto request, [FromHeader] int id)
    {
        var admin = await _context.Admins.SingleOrDefaultAsync(e => e.AdminID == id);

        if (admin == null)
        {
            return NotFound("Admin not found.");
        }

        if (!HashHelper.VerifyHash(request.OldPassword, admin.PasswordHash))
        {
            return BadRequest("Old password is incorrect.");
        }

        if (HashHelper.VerifyHash(request.NewPassword, admin.PasswordHash))
        {
            return BadRequest("New password must be different from the old password.");
        }

        admin.PasswordHash = HashHelper.ComputeHash(request.NewPassword);
        await _context.SaveChangesAsync();

        return Ok("Password changed successfully.");
    }


}

