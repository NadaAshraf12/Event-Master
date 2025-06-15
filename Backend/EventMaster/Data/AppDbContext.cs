using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Admin> Admins { get; set; }
    public DbSet<Attachment> Attachments { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventOrganizer> EventOrganizers { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<PaymentMethod> PaymentMethods { get; set; }
    public DbSet<Registration> Registrations { get; set; }
    public DbSet<SavedEvent> SavedEvents { get; set; }
    public DbSet<Status> Statuses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Event>()
            .HasOne(e => e.Status)
            .WithMany(s => s.Events)
            .HasForeignKey(e => e.StatusId)
            .OnDelete(DeleteBehavior.NoAction);
    }

}
