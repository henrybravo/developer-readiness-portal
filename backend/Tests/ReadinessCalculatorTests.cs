using Backend.Models;
using Backend.Services;
using Xunit;

namespace Backend.Tests;

/// <summary>
/// Unit tests for ReadinessCalculator service.
/// Validates business rules:
/// - Green: 90%+ completion
/// - Yellow: 50-89% completion
/// - Red: Less than 50% completion
/// </summary>
public class ReadinessCalculatorTests
{
    private readonly ReadinessCalculator _calculator;

    public ReadinessCalculatorTests()
    {
        _calculator = new ReadinessCalculator();
    }

    #region Team Status Calculation Tests

    [Fact]
    public void CalculateTeamStatus_AllItemsComplete_ReturnsGreen()
    {
        // Arrange
        var checklist = CreateChecklist(completedCount: 10, totalCount: 10); // 100%

        // Act
        var status = _calculator.CalculateTeamStatus(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Green, status);
    }

    [Fact]
    public void CalculateTeamStatus_ExactlyNinetyPercent_ReturnsGreen()
    {
        // Arrange
        var checklist = CreateChecklist(completedCount: 9, totalCount: 10); // 90%

        // Act
        var status = _calculator.CalculateTeamStatus(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Green, status);
    }

    [Fact]
    public void CalculateTeamStatus_EightyNinePercent_ReturnsYellow()
    {
        // Arrange
        // 89 out of 100 items = 89% exactly
        var checklist = CreateChecklist(completedCount: 89, totalCount: 100);

        // Act
        var status = _calculator.CalculateTeamStatus(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Yellow, status);
    }

    [Fact]
    public void CalculateTeamStatus_ExactlyFiftyPercent_ReturnsYellow()
    {
        // Arrange
        // 50 out of 100 items would give 51 total (9 per cat), so use 48/96 = exactly 50%
        var checklist = CreateChecklist(completedCount: 48, totalCount: 96);

        // Act
        var status = _calculator.CalculateTeamStatus(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Yellow, status);
    }

    [Fact]
    public void CalculateTeamStatus_FortyNinePercent_ReturnsRed()
    {
        // Arrange
        // 49 out of 102 items = 48.04%
        var checklist = CreateChecklist(completedCount: 49, totalCount: 102);

        // Act
        var status = _calculator.CalculateTeamStatus(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Red, status);
    }

    [Fact]
    public void CalculateTeamStatus_NoItemsComplete_ReturnsRed()
    {
        // Arrange
        var checklist = CreateChecklist(completedCount: 0, totalCount: 10); // 0%

        // Act
        var status = _calculator.CalculateTeamStatus(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Red, status);
    }

    [Fact]
    public void CalculateTeamStatus_EmptyChecklist_ReturnsRed()
    {
        // Arrange
        var checklist = new Checklist();

        // Act
        var status = _calculator.CalculateTeamStatus(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Red, status);
    }

    #endregion

    #region Category Status Calculation Tests

    [Fact]
    public void CalculateCategoryStatus_AllComplete_ReturnsGreen()
    {
        // Arrange
        var items = CreateChecklistItems(completedCount: 5, totalCount: 5);

        // Act
        var status = _calculator.CalculateCategoryStatus(items);

        // Assert
        Assert.Equal(ReadinessStatus.Green, status);
    }

    [Fact]
    public void CalculateCategoryStatus_NinetyPercent_ReturnsGreen()
    {
        // Arrange
        var items = CreateChecklistItems(completedCount: 9, totalCount: 10);

        // Act
        var status = _calculator.CalculateCategoryStatus(items);

        // Assert
        Assert.Equal(ReadinessStatus.Green, status);
    }

    [Fact]
    public void CalculateCategoryStatus_SeventyPercent_ReturnsYellow()
    {
        // Arrange
        var items = CreateChecklistItems(completedCount: 7, totalCount: 10);

        // Act
        var status = _calculator.CalculateCategoryStatus(items);

        // Assert
        Assert.Equal(ReadinessStatus.Yellow, status);
    }

    [Fact]
    public void CalculateCategoryStatus_ThirtyPercent_ReturnsRed()
    {
        // Arrange
        var items = CreateChecklistItems(completedCount: 3, totalCount: 10);

        // Act
        var status = _calculator.CalculateCategoryStatus(items);

        // Assert
        Assert.Equal(ReadinessStatus.Red, status);
    }

    [Fact]
    public void CalculateCategoryStatus_EmptyList_ReturnsRed()
    {
        // Arrange
        var items = new List<ChecklistItem>();

        // Act
        var status = _calculator.CalculateCategoryStatus(items);

        // Assert
        Assert.Equal(ReadinessStatus.Red, status);
    }

    [Fact]
    public void CalculateCategoryStatus_NullList_ReturnsRed()
    {
        // Arrange
        List<ChecklistItem>? items = null;

        // Act
        var status = _calculator.CalculateCategoryStatus(items!);

        // Assert
        Assert.Equal(ReadinessStatus.Red, status);
    }

    #endregion

    #region Category Statuses Tests

    [Fact]
    public void CalculateCategoryStatuses_ReturnsAllSixCategories()
    {
        // Arrange
        var checklist = CreateChecklist(completedCount: 15, totalCount: 30);

        // Act
        var categoryStatuses = _calculator.CalculateCategoryStatuses(checklist);

        // Assert
        Assert.Equal(6, categoryStatuses.Count);
        Assert.Contains("Codebase", categoryStatuses.Keys);
        Assert.Contains("Versioning", categoryStatuses.Keys);
        Assert.Contains("Documentation", categoryStatuses.Keys);
        Assert.Contains("Testing", categoryStatuses.Keys);
        Assert.Contains("Copilot", categoryStatuses.Keys);
        Assert.Contains("Modernization", categoryStatuses.Keys);
    }

    [Fact]
    public void CalculateCategoryStatuses_VariedCompletion_ReturnsCorrectStatuses()
    {
        // Arrange
        var checklist = new Checklist
        {
            Codebase = CreateChecklistItems(5, 5),           // 100% - Green
            Versioning = CreateChecklistItems(4, 5),         // 80% - Yellow
            Documentation = CreateChecklistItems(2, 5),      // 40% - Red
            Testing = CreateChecklistItems(5, 5),            // 100% - Green
            Copilot = CreateChecklistItems(3, 5),            // 60% - Yellow
            Modernization = CreateChecklistItems(1, 5)       // 20% - Red
        };

        // Act
        var categoryStatuses = _calculator.CalculateCategoryStatuses(checklist);

        // Assert
        Assert.Equal(ReadinessStatus.Green, categoryStatuses["Codebase"]);
        Assert.Equal(ReadinessStatus.Yellow, categoryStatuses["Versioning"]);
        Assert.Equal(ReadinessStatus.Red, categoryStatuses["Documentation"]);
        Assert.Equal(ReadinessStatus.Green, categoryStatuses["Testing"]);
        Assert.Equal(ReadinessStatus.Yellow, categoryStatuses["Copilot"]);
        Assert.Equal(ReadinessStatus.Red, categoryStatuses["Modernization"]);
    }

    #endregion

    #region Category Percentages Tests

    [Fact]
    public void CalculateCategoryPercentages_ReturnsAllSixCategories()
    {
        // Arrange
        var checklist = CreateChecklist(completedCount: 15, totalCount: 30);

        // Act
        var categoryPercentages = _calculator.CalculateCategoryPercentages(checklist);

        // Assert
        Assert.Equal(6, categoryPercentages.Count);
        Assert.Contains("Codebase", categoryPercentages.Keys);
        Assert.Contains("Versioning", categoryPercentages.Keys);
        Assert.Contains("Documentation", categoryPercentages.Keys);
        Assert.Contains("Testing", categoryPercentages.Keys);
        Assert.Contains("Copilot", categoryPercentages.Keys);
        Assert.Contains("Modernization", categoryPercentages.Keys);
    }

    [Fact]
    public void CalculateCategoryPercentages_ReturnsCorrectPercentages()
    {
        // Arrange
        var checklist = new Checklist
        {
            Codebase = CreateChecklistItems(5, 5),           // 100%
            Versioning = CreateChecklistItems(4, 5),         // 80%
            Documentation = CreateChecklistItems(3, 5),      // 60%
            Testing = CreateChecklistItems(2, 5),            // 40%
            Copilot = CreateChecklistItems(1, 5),            // 20%
            Modernization = CreateChecklistItems(0, 5)       // 0%
        };

        // Act
        var percentages = _calculator.CalculateCategoryPercentages(checklist);

        // Assert
        Assert.Equal(100.0, percentages["Codebase"]);
        Assert.Equal(80.0, percentages["Versioning"]);
        Assert.Equal(60.0, percentages["Documentation"]);
        Assert.Equal(40.0, percentages["Testing"]);
        Assert.Equal(20.0, percentages["Copilot"]);
        Assert.Equal(0.0, percentages["Modernization"]);
    }

    #endregion

    #region Update Team Readiness Tests

    [Fact]
    public void UpdateTeamReadiness_CalculatesCorrectStatus()
    {
        // Arrange
        var team = new Team
        {
            Id = "test-team",
            Name = "Test Team",
            Readiness = ReadinessStatus.Red, // Old status
            Checklist = CreateChecklist(completedCount: 9, totalCount: 10) // 90% - should be Green
        };

        // Act
        var updatedTeam = _calculator.UpdateTeamReadiness(team);

        // Assert
        Assert.Equal(ReadinessStatus.Green, updatedTeam.Readiness);
    }

    [Fact]
    public void UpdateTeamReadiness_PreservesOtherProperties()
    {
        // Arrange
        var team = new Team
        {
            Id = "test-team",
            Name = "Test Team",
            Description = "Test Description",
            Stack = new TechStack { Frontend = "React", Backend = ".NET" },
            Readiness = ReadinessStatus.Red,
            Checklist = CreateChecklist(completedCount: 6, totalCount: 10)
        };

        // Act
        var updatedTeam = _calculator.UpdateTeamReadiness(team);

        // Assert
        Assert.Equal(team.Id, updatedTeam.Id);
        Assert.Equal(team.Name, updatedTeam.Name);
        Assert.Equal(team.Description, updatedTeam.Description);
        Assert.Equal(team.Stack, updatedTeam.Stack);
        Assert.Equal(team.Checklist, updatedTeam.Checklist);
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates a checklist with exact specified counts.
    /// Distributes items and completed items as evenly as possible across categories.
    /// </summary>
    private Checklist CreateChecklist(int completedCount, int totalCount)
    {
        // Distribute total items across 6 categories
        var baseItems = totalCount / 6;
        var extraItems = totalCount % 6;
        
        // Distribute completed items across 6 categories
        var baseCompleted = completedCount / 6;
        var extraCompleted = completedCount % 6;

        // Create item counts for each category (total items)
        var itemCounts = new int[6];
        for (int i = 0; i < 6; i++)
        {
            itemCounts[i] = baseItems + (i < extraItems ? 1 : 0);
        }

        // Create completed counts for each category
        var completedCounts = new int[6];
        for (int i = 0; i < 6; i++)
        {
            completedCounts[i] = baseCompleted + (i < extraCompleted ? 1 : 0);
        }

        return new Checklist
        {
            Codebase = CreateChecklistItems(completedCounts[0], itemCounts[0]),
            Versioning = CreateChecklistItems(completedCounts[1], itemCounts[1]),
            Documentation = CreateChecklistItems(completedCounts[2], itemCounts[2]),
            Testing = CreateChecklistItems(completedCounts[3], itemCounts[3]),
            Copilot = CreateChecklistItems(completedCounts[4], itemCounts[4]),
            Modernization = CreateChecklistItems(completedCounts[5], itemCounts[5])
        };
    }

    /// <summary>
    /// Creates a list of checklist items with specified completion count.
    /// </summary>
    private List<ChecklistItem> CreateChecklistItems(int completedCount, int totalCount)
    {
        var items = new List<ChecklistItem>();

        for (int i = 0; i < totalCount; i++)
        {
            items.Add(new ChecklistItem
            {
                Id = $"item-{i}",
                Description = $"Test item {i}",
                IsComplete = i < completedCount
            });
        }

        return items;
    }

    #endregion
}
