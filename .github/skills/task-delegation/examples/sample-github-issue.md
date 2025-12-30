# Sample GitHub Issue: Task CRUD API Implementation

This is an example of a well-structured GitHub issue for delegation to Copilot.

---

## Implement Task CRUD API Endpoints

### Description

Implement the complete CRUD (Create, Read, Update, Delete) API endpoints for task management. Tasks are the core entity in TaskFlow and need to support workspace isolation, user assignment, and soft deletion.

This is a foundational feature that enables all task management functionality in the application. The API should follow RESTful conventions and integrate with the existing authentication middleware.

### Requirements

#### Technical Requirements
- [ ] Create Task entity with EF Core mapping
- [ ] Implement TaskService with business logic layer
- [ ] Create TaskController with all CRUD endpoints
- [ ] Add FluentValidation validators for all inputs
- [ ] Implement pagination for list endpoint (default: 20 items)
- [ ] Add filtering by status, priority, and assignee
- [ ] Implement soft delete (set DeletedAt, don't physically delete)
- [ ] Add EF Core global query filter to exclude soft-deleted records

#### Functional Requirements
- [ ] Tasks must be scoped to workspaces (users can only see their workspace's tasks)
- [ ] Task creation should auto-assign CreatedBy from JWT claims
- [ ] Task updates should track UpdatedAt timestamp
- [ ] Assignment changes should validate user is workspace member

### Dependencies

This task depends on:
- #15 - Backend API scaffolding (MERGED)
- #18 - Database schema initialization (MERGED)
- #22 - Authentication middleware (MERGED)

**Note:** All dependencies are complete. This task is ready to start.

### Acceptance Criteria

- [ ] **AC-1:** POST `/api/v1/workspaces/{id}/tasks` creates a task with provided title, description, priority, and optional assignee
- [ ] **AC-2:** GET `/api/v1/workspaces/{id}/tasks` returns paginated list of tasks with support for `?status=`, `?priority=`, `?assignee=` filters
- [ ] **AC-3:** GET `/api/v1/workspaces/{id}/tasks/{taskId}` returns single task with all properties
- [ ] **AC-4:** PUT `/api/v1/workspaces/{id}/tasks/{taskId}` updates task properties and sets UpdatedAt
- [ ] **AC-5:** DELETE `/api/v1/workspaces/{id}/tasks/{taskId}` soft-deletes the task (sets DeletedAt)
- [ ] **AC-6:** All endpoints return 404 for tasks in other workspaces (workspace isolation)
- [ ] **AC-7:** All endpoints return 400 with validation errors for invalid input
- [ ] **AC-8:** All endpoints return 401 for unauthenticated requests

### Testing Requirements

#### Unit Tests
- [ ] TaskService.CreateAsync - valid task creation
- [ ] TaskService.CreateAsync - missing required fields returns validation error
- [ ] TaskService.UpdateAsync - partial update works correctly
- [ ] TaskService.DeleteAsync - sets DeletedAt timestamp
- [ ] TaskService.GetListAsync - pagination returns correct page
- [ ] TaskService.GetListAsync - filtering by status works
- [ ] TaskService.GetListAsync - filtering by priority works
- [ ] TaskService.GetListAsync - filtering by assignee works
- [ ] TaskController - returns 404 for non-existent task
- [ ] TaskController - returns 401 for unauthenticated user
- [ ] **Minimum coverage: 85%**

#### Integration Tests
- [ ] Full CRUD flow - create, read, update, delete
- [ ] Workspace isolation - cannot access other workspace's tasks
- [ ] Soft delete - deleted tasks excluded from list

#### Manual Testing
- [ ] Test all endpoints via Swagger UI
- [ ] Verify response formats match OpenAPI spec

### Technical Constraints

- Follow coding standards in `AGENTS.md`
- Use MediatR for CQRS pattern (separate commands and queries)
- Use FluentValidation for input validation
- Use specification pattern for query filtering
- Entity must inherit from BaseEntity for audit fields
- Use Azure SQL as database (per ADR-0005)

### API Specification

```yaml
paths:
  /api/v1/workspaces/{workspaceId}/tasks:
    get:
      summary: List tasks in workspace
      parameters:
        - name: page (default: 1)
        - name: pageSize (default: 20, max: 100)
        - name: status (optional)
        - name: priority (optional)
        - name: assignee (optional)
      responses:
        200: PagedResult<TaskDto>
        401: Unauthorized
    post:
      summary: Create task
      requestBody: CreateTaskRequest
      responses:
        201: TaskDto
        400: ValidationErrors
        401: Unauthorized

  /api/v1/workspaces/{workspaceId}/tasks/{taskId}:
    get:
      responses:
        200: TaskDto
        404: NotFound
        401: Unauthorized
    put:
      requestBody: UpdateTaskRequest
      responses:
        200: TaskDto
        404: NotFound
        400: ValidationErrors
        401: Unauthorized
    delete:
      responses:
        204: NoContent
        404: NotFound
        401: Unauthorized
```

### References

| Document | Link |
|----------|------|
| PRD | [specs/prd.md](../specs/prd.md) |
| FRD | [specs/features/task-management.md](../specs/features/task-management.md) |
| Task Spec | [specs/tasks/021-task-task-crud-api.md](../specs/tasks/021-task-task-crud-api.md) |
| Standards | [AGENTS.md](../AGENTS.md) |
| ADR-0005 | [specs/adr/0005-database-choice.md](../specs/adr/0005-database-choice.md) |

### Labels

`feature` `backend` `priority:high`

---

**Assigned to:** @copilot
