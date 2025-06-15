using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EventMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "ParticipantOnly")]

    public class PaymentMethodController : ControllerBase
    {
        private readonly AppDbContext _context;

        PaymentMethodController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var paymentMethods= await _context.PaymentMethods.ToListAsync();
            return Ok(paymentMethods);
        }

    }
}
