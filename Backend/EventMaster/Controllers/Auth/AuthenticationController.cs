using EventMaster.Data;
using EventMaster.GlobalFunctions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace EventMaster.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(
            AppDbContext context,
            TokenService tokenService,
            ILogger<AuthenticationController> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var isAdmin = await _context.Admins.SingleOrDefaultAsync(e => e.Username == loginDto.Username);
                if (isAdmin != null && HashHelper.VerifyHash(loginDto.Password, isAdmin.PasswordHash))
                {
                    return GenerateTokensAndResponse(isAdmin.Email, "Admin", isAdmin.AdminID.ToString());
                }

                var isEventOrganizer = await _context.EventOrganizers.SingleOrDefaultAsync(e => e.Name == loginDto.Username);
                if (isEventOrganizer != null && HashHelper.VerifyHash(loginDto.Password, isEventOrganizer.PasswordHash))
                {
                    return GenerateTokensAndResponse(isEventOrganizer.Email, "EventOrganizer", isEventOrganizer.EventOrganizerID.ToString());
                }

                var isParticipant = await _context.Participants.SingleOrDefaultAsync(e => e.Name == loginDto.Username);
                if (isParticipant != null && HashHelper.VerifyHash(loginDto.Password, isParticipant.PasswordHash))
                {
                    return GenerateTokensAndResponse(isParticipant.Email, "Participant", isParticipant.ParticipantID.ToString());
                }

                return Unauthorized("Invalid username or password.");
            }
            catch
            {
                return StatusCode(500, "An error occurred during login");
            }
        }

        [HttpPost("refresh")]
        public IActionResult Refresh()
        {
            try
            {
                var refreshToken = Request.Cookies["refreshToken"];
                if (string.IsNullOrEmpty(refreshToken))
                {
                    return Unauthorized("Refresh token is missing.");
                }

                var principal = _tokenService.ValidateToken(refreshToken);
                if (principal == null)
                {
                    return Unauthorized("Invalid refresh token.");
                }

                var email = principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
                var role = principal.FindFirstValue(ClaimTypes.Role);
                var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

                var jwtToken = _tokenService.GenerateJwtToken(email, role, userId);
                var newRefreshToken = _tokenService.GenerateRefreshToken(email, role, userId);

                Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTime.UtcNow.AddDays(1)
                });

                return Ok(new { Token = jwtToken });
            }
            catch
            {
                return Unauthorized("Invalid refresh token.");
            }
        }

        private IActionResult GenerateTokensAndResponse(string email, string role, string userId)
        {
            var jwtToken = _tokenService.GenerateJwtToken(email, role, userId);
            var refreshToken = _tokenService.GenerateRefreshToken(email, role, userId);

            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(1)
            });

            return Ok(new
            {
                Token = jwtToken,
                Role = role,
                Id = userId,
                Email = email
            });
        }
    }
}
