# API Documentation Template

Template for generating comprehensive API documentation.

---

## API Reference: [Service Name]

### Overview

[Brief description of the API and its purpose]

**Base URL:** `https://api.example.com/v1`

**Authentication:** [Auth method - Bearer Token, API Key, OAuth 2.0]

---

## Authentication

### Obtaining Credentials

[Instructions for getting API credentials]

### Making Authenticated Requests

```bash
curl -X GET "https://api.example.com/v1/resource" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

### Token Refresh

[If applicable, document token refresh process]

---

## Endpoints

### [Resource Name]

#### List [Resources]

```http
GET /resources
```

**Description:** [What this endpoint does]

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |
| `filter` | string | No | Filter expression |

**Response:**

```json
{
  "data": [
    {
      "id": "res_123",
      "name": "Resource Name",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

**Example:**

```bash
curl -X GET "https://api.example.com/v1/resources?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

#### Get [Resource]

```http
GET /resources/{id}
```

**Description:** Retrieves a single resource by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Resource identifier |

**Response:**

```json
{
  "id": "res_123",
  "name": "Resource Name",
  "description": "Detailed description",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

#### Create [Resource]

```http
POST /resources
```

**Description:** Creates a new resource.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Resource name (max 100 chars) |
| `description` | string | No | Resource description |
| `type` | string | Yes | Resource type: `standard`, `premium` |

**Example Request:**

```json
{
  "name": "New Resource",
  "description": "Description of the resource",
  "type": "standard"
}
```

**Response:** `201 Created`

```json
{
  "id": "res_456",
  "name": "New Resource",
  "description": "Description of the resource",
  "type": "standard",
  "status": "pending",
  "created_at": "2024-01-15T12:00:00Z"
}
```

---

#### Update [Resource]

```http
PUT /resources/{id}
```

**Description:** Updates an existing resource.

**Request Body:** Same as Create (all fields optional)

**Response:** `200 OK` with updated resource

---

#### Delete [Resource]

```http
DELETE /resources/{id}
```

**Description:** Deletes a resource.

**Response:** `204 No Content`

---

## Error Handling

### Error Response Format

All errors follow this structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error message",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  }
}
```

### Error Codes

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | `BAD_REQUEST` | Invalid request format |
| 400 | `VALIDATION_ERROR` | Request validation failed |
| 401 | `UNAUTHORIZED` | Missing or invalid authentication |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict (duplicate) |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

---

## Rate Limiting

- **Limit:** 1000 requests per hour
- **Headers:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Webhooks

### Configuring Webhooks

[Instructions for webhook setup]

### Webhook Events

| Event | Description |
|-------|-------------|
| `resource.created` | New resource created |
| `resource.updated` | Resource modified |
| `resource.deleted` | Resource removed |

### Webhook Payload

```json
{
  "event": "resource.created",
  "timestamp": "2024-01-15T12:00:00Z",
  "data": {
    "id": "res_123",
    "name": "Resource Name"
  }
}
```

---

## SDKs and Libraries

### Official SDKs

- [JavaScript/TypeScript](link)
- [Python](link)
- [.NET](link)
- [Go](link)

### Installation

```bash
# JavaScript
npm install @example/api-client

# Python
pip install example-api

# .NET
dotnet add package Example.Api.Client
```

### Quick Start

```javascript
import { Client } from '@example/api-client';

const client = new Client({ apiKey: 'YOUR_API_KEY' });

const resources = await client.resources.list();
console.log(resources);
```

---

## Changelog

### v1.2.0 (2024-01-15)
- Added webhook support
- New filtering options for list endpoints

### v1.1.0 (2024-01-01)
- Added batch operations
- Improved error messages

### v1.0.0 (2023-12-01)
- Initial release

---

*Generated by Documentation Synthesis Skill*
