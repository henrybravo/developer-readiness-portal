namespace Backend.Models;

/// <summary>
/// Standard error response format
/// </summary>
public record ErrorResponse
{
    /// <summary>
    /// HTTP status code
    /// </summary>
    public required int StatusCode { get; init; }
    
    /// <summary>
    /// Error message
    /// </summary>
    public required string Message { get; init; }
    
    /// <summary>
    /// Additional error details (optional)
    /// </summary>
    public string? Details { get; init; }
    
    /// <summary>
    /// Request path that caused the error
    /// </summary>
    public string? Path { get; init; }
    
    /// <summary>
    /// Timestamp of the error
    /// </summary>
    public DateTime Timestamp { get; init; } = DateTime.UtcNow;
}
