namespace Backend.Models;

/// <summary>
/// Represents the result of an automated UI test execution.
/// </summary>
public record TestResult
{
    /// <summary>
    /// Whether the test passed successfully
    /// </summary>
    public bool Success { get; init; }

    /// <summary>
    /// Test execution timestamp
    /// </summary>
    public DateTime Timestamp { get; init; } = DateTime.UtcNow;

    /// <summary>
    /// Test execution logs and output
    /// </summary>
    public string Logs { get; init; } = string.Empty;

    /// <summary>
    /// Base64-encoded screenshot captured during test
    /// </summary>
    public string? ScreenshotBase64 { get; init; }

    /// <summary>
    /// Duration of test execution in milliseconds
    /// </summary>
    public int DurationMs { get; init; }

    /// <summary>
    /// Name or identifier of the test that was run
    /// </summary>
    public string TestName { get; init; } = "UI Test";

    /// <summary>
    /// Error message if the test failed
    /// </summary>
    public string? ErrorMessage { get; init; }
}
