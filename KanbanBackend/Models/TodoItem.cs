namespace KanbanBackend.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? Priority{ get; set; }
        public string? Deadline { get; set; }
        public int? Column { get; set; }

    }
}
