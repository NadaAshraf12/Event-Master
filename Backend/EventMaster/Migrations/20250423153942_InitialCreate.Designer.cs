﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EventMaster.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250423153942_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Admin", b =>
                {
                    b.Property<int>("AdminID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AdminID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("AdminID");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("Attachment", b =>
                {
                    b.Property<int>("AttachmentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AttachmentID"));

                    b.Property<int>("EventID")
                        .HasColumnType("int");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("AttachmentID");

                    b.HasIndex("EventID");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("Event", b =>
                {
                    b.Property<int>("EventID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EventID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EventDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("EventOrganizerID")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("ParticipantsCount")
                        .HasColumnType("int");

                    b.Property<int>("StatusId")
                        .HasColumnType("int");

                    b.Property<decimal>("TicketPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("TicketsLeft")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("EventID");

                    b.HasIndex("EventOrganizerID");

                    b.HasIndex("StatusId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("EventOrganizer", b =>
                {
                    b.Property<int>("EventOrganizerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EventOrganizerID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StatusId")
                        .HasColumnType("int");

                    b.HasKey("EventOrganizerID");

                    b.HasIndex("StatusId");

                    b.ToTable("EventOrganizers");
                });

            modelBuilder.Entity("Notification", b =>
                {
                    b.Property<int>("NotificationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NotificationID"));

                    b.Property<int?>("EventID")
                        .HasColumnType("int");

                    b.Property<bool>("IsRead")
                        .HasColumnType("bit");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParticipantID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.HasKey("NotificationID");

                    b.HasIndex("EventID");

                    b.HasIndex("ParticipantID");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Participant", b =>
                {
                    b.Property<int>("ParticipantID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ParticipantID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ParticipantID");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("PaymentMethod", b =>
                {
                    b.Property<int>("PaymentMethodId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentMethodId"));

                    b.Property<string>("PaymentMethodName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("PaymentMethodId");

                    b.ToTable("PaymentMethods");
                });

            modelBuilder.Entity("Registration", b =>
                {
                    b.Property<int>("RegistrationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RegistrationID"));

                    b.Property<int>("EventID")
                        .HasColumnType("int");

                    b.Property<int>("ParticipantID")
                        .HasColumnType("int");

                    b.Property<int>("PaymentMethodId")
                        .HasColumnType("int");

                    b.HasKey("RegistrationID");

                    b.HasIndex("EventID");

                    b.HasIndex("ParticipantID");

                    b.HasIndex("PaymentMethodId");

                    b.ToTable("Registrations");
                });

            modelBuilder.Entity("SavedEvent", b =>
                {
                    b.Property<int>("SavedID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SavedID"));

                    b.Property<int>("EventID")
                        .HasColumnType("int");

                    b.Property<int>("ParticipantID")
                        .HasColumnType("int");

                    b.HasKey("SavedID");

                    b.HasIndex("EventID");

                    b.HasIndex("ParticipantID");

                    b.ToTable("SavedEvents");
                });

            modelBuilder.Entity("Status", b =>
                {
                    b.Property<int>("StatusId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StatusId"));

                    b.Property<string>("StatusName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("StatusId");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("Attachment", b =>
                {
                    b.HasOne("Event", "Event")
                        .WithMany("Attachments")
                        .HasForeignKey("EventID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("Event", b =>
                {
                    b.HasOne("EventOrganizer", "EventOrganizer")
                        .WithMany("Events")
                        .HasForeignKey("EventOrganizerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Status", "Status")
                        .WithMany("Events")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("EventOrganizer");

                    b.Navigation("Status");
                });

            modelBuilder.Entity("EventOrganizer", b =>
                {
                    b.HasOne("Status", "Status")
                        .WithMany("EventOrganizers")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Status");
                });

            modelBuilder.Entity("Notification", b =>
                {
                    b.HasOne("Event", "Event")
                        .WithMany("Notifications")
                        .HasForeignKey("EventID");

                    b.HasOne("Participant", "Participant")
                        .WithMany("Notifications")
                        .HasForeignKey("ParticipantID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Participant");
                });

            modelBuilder.Entity("Registration", b =>
                {
                    b.HasOne("Event", "Event")
                        .WithMany("Registrations")
                        .HasForeignKey("EventID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Participant", "Participant")
                        .WithMany("Registrations")
                        .HasForeignKey("ParticipantID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PaymentMethod", "PaymentMethod")
                        .WithMany("Registrations")
                        .HasForeignKey("PaymentMethodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Participant");

                    b.Navigation("PaymentMethod");
                });

            modelBuilder.Entity("SavedEvent", b =>
                {
                    b.HasOne("Event", "Event")
                        .WithMany("SavedEvents")
                        .HasForeignKey("EventID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Participant", "Participant")
                        .WithMany("SavedEvents")
                        .HasForeignKey("ParticipantID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Participant");
                });

            modelBuilder.Entity("Event", b =>
                {
                    b.Navigation("Attachments");

                    b.Navigation("Notifications");

                    b.Navigation("Registrations");

                    b.Navigation("SavedEvents");
                });

            modelBuilder.Entity("EventOrganizer", b =>
                {
                    b.Navigation("Events");
                });

            modelBuilder.Entity("Participant", b =>
                {
                    b.Navigation("Notifications");

                    b.Navigation("Registrations");

                    b.Navigation("SavedEvents");
                });

            modelBuilder.Entity("PaymentMethod", b =>
                {
                    b.Navigation("Registrations");
                });

            modelBuilder.Entity("Status", b =>
                {
                    b.Navigation("EventOrganizers");

                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}
