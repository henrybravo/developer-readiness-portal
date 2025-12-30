# 021-Task-Task-CRUD-API

**Task ID**: TASK-021
**FRD Reference**: FRD-002
**Status**: Complete
**Assigned To**: @developer

## Description

Implement the Task CRUD API endpoints that allow creating, reading, updating, and deleting tasks within a workspace. Tasks must be scoped to workspaces and respect user permissions.

## Technical Requirements

### Backend Requirements
- [x] Create Task entity with all required properties
- [x] Implement TaskService with business logic
- [x] Create TaskController with CRUD endpoints
- [x] Add workspace scoping middleware
- [x] Implement soft delete for tasks
- [x] Add validation for all inputs
- [x] Implement pagination for list endpoint

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/workspaces/{id}/tasks` | List tasks with pagination and filters |
| GET | `/api/v1/workspaces/{id}/tasks/{taskId}` | Get single task by ID |
| POST | `/api/v1/workspaces/{id}/tasks` | Create new task |
| PUT | `/api/v1/workspaces/{id}/tasks/{taskId}` | Update existing task |
| DELETE | `/api/v1/workspaces/{id}/tasks/{taskId}` | Soft delete task |

### Data Models

```
Entity: Task
- Id: Guid (PK)
- WorkspaceId: Guid (FK)
- Title: string (required, max 200)
- Description: string (optional, max 5000)
- Status: TaskStatus enum (ToDo, InProgress, Done)
- Priority: TaskPriority enum (Low, Medium, High, Critical)
- AssigneeId: Guid? (FK to User)
- DueDate: DateTime?
- CreatedAt: DateTime
- UpdatedAt: DateTime
- DeletedAt: DateTime? (soft delete)
- CreatedBy: Guid (FK to User)
```

## Dependencies

| Task | Status | Notes |
|------|--------|-------|
| TASK-001 | Complete | Backend scaffolding required |
| TASK-004 | Complete | Database schema must be initialized |
| TASK-011 | Complete | Auth middleware for workspace scoping |

## Acceptance Criteria

- [x] **AC-1**: Tasks can be created with title (required), description, priority, due date, and assignee
- [x] **AC-2**: Tasks are automatically scoped to the workspace from the URL
- [x] **AC-3**: Only workspace members can access tasks in that workspace
- [x] **AC-4**: List endpoint supports pagination (page, pageSize) with defaults
- [x] **AC-5**: List endpoint supports filtering by status, priority, and assignee
- [x] **AC-6**: Deleted tasks are soft-deleted and excluded from normal queries
- [x] **AC-7**: All inputs are validated with appropriate error messages
- [x] **AC-8**: Created/Updated timestamps are automatically managed

## Testing Requirements

### Unit Tests
- [x] Test task creation with valid data
- [x] Test task creation with missing required fields
- [x] Test task update with partial data
- [x] Test soft delete marks DeletedAt
- [x] Test list pagination returns correct results
- [x] Test list filtering by status
- [x] Test list filtering by priority
- [x] Test list filtering by assignee
- [x] Test unauthorized access to different workspace
- [x] Coverage: 92%

### Integration Tests
- [x] Test full CRUD flow end-to-end
- [x] Test workspace isolation (can't access other workspace tasks)
- [x] Test authentication required for all endpoints

### Manual Testing
- [x] Create task via Swagger UI
- [x] Verify task appears in list
- [x] Update task and verify changes
- [x] Delete task and verify soft delete

## Implementation Notes

- Used FluentValidation for input validation
- Implemented specification pattern for filtering
- Added EF Core query filters to exclude soft-deleted records
- Used MediatR for CQRS pattern (commands and queries separated)

## References

- FRD: [specs/features/task-management.md](specs/features/task-management.md)
- ADR-0005: [specs/adr/0005-database-choice.md](specs/adr/0005-database-choice.md) - Azure SQL decision
- Design: [Figma Task Management Designs](https://figma.com/...)

---

*Completed: December 15, 2024*
