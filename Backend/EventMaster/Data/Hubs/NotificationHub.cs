using Microsoft.AspNetCore.SignalR;

namespace EventMaster.Data.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task JoinNotificationGroup(string participantId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"participant-{participantId}");
        }

        public async Task LeaveNotificationGroup(string participantId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"participant-{participantId}");
        }
    }
}
