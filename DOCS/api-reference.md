# API Reference

> Complete reference for all HTTP endpoints exposed by `@koda-arc/server`, including request/response schemas and SSE event formats.

---

## Base URL

```
http://localhost:3000
```

The server runs on port 3000 by default. The CLI reads the `API_URL` environment variable (falling back to `http://localhost:3000`).

---

## Sessions API

### `GET /sessions`

List all sessions, ordered by creation date (newest first).

**Response:** `200 OK`

```json
[
  {
    "id": "clxyz123abc",
    "title": "Fix authentication bug",
    "createdAt": "2026-06-21T10:30:00.000Z"
  }
]
```

---

### `GET /sessions/:id`

Retrieve a single session with its full message history.

**Parameters:**

| Param | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` (path) | Session CUID |

**Response:** `200 OK`

```json
{
  "id": "clxyz123abc",
  "userId": "DEV_MOCK_USER",
  "title": "Fix authentication bug",
  "cwd": "/Users/dev/project",
  "createdAt": "2026-06-21T10:30:00.000Z",
  "updatedAt": "2026-06-21T10:35:00.000Z",
  "messages": [
    {
      "id": "clxyz456def",
      "sessionId": "clxyz123abc",
      "role": "USER",
      "status": "COMPLETE",
      "content": "Fix the login flow",
      "parts": null,
      "model": "gemini-2.5-flash",
      "agentState": "BUILD",
      "duration": null,
      "createdAt": "2026-06-21T10:30:00.000Z"
    }
  ]
}
```

**Error:** `404 Not Found`

```json
{ "error": "Session not found" }
```

---

### `POST /sessions`

Create a new session, optionally with an initial user message.

**Request Body:**

```json
{
  "title": "Fix authentication bug",
  "cwd": "/Users/dev/project",
  "initialMessage": {
    "role": "USER",
    "content": "Fix the login flow",
    "agentState": "BUILD",
    "model": "gemini-2.5-flash"
  }
}
```

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `title` | `string` | ✅ | Session title (typically first 100 chars of the prompt) |
| `cwd` | `string` | ❌ | Working directory for file/tool operations |
| `initialMessage` | `object` | ❌ | Create the session with an initial message already attached |
| `initialMessage.role` | `"USER"` | ✅ (if `initialMessage`) | Must be `"USER"` |
| `initialMessage.content` | `string` | ✅ (if `initialMessage`) | Message text |
| `initialMessage.agentState` | `"PLAN" \| "BUILD"` | ✅ (if `initialMessage`) | Agent mode |
| `initialMessage.model` | `string` | ✅ (if `initialMessage`) | Must be a registered model ID |

**Response:** `201 Created`

Returns the full session object including messages.

**Error:** `400 Bad Request`

```json
{ "error": "Invalid request body" }
```

---

### `DELETE /sessions/:id`

Delete a session and all its messages (cascade).

**Response:** `200 OK`

```json
{ "success": true }
```

**Error:** `404 Not Found`

```json
{ "error": "Session not found" }
```

---

## Chat API

### `POST /chat/:sessionId`

Submit a new user message and stream the AI response.

**Parameters:**

| Param | Type | Description |
| ----- | ---- | ----------- |
| `sessionId` | `string` (path) | Session CUID |

**Request Body:**

```json
{
  "content": "Refactor the auth module",
  "agentState": "BUILD",
  "model": "claude-sonnet-4-6"
}
```

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `content` | `string` | ✅ | User message text |
| `agentState` | `"PLAN" \| "BUILD"` | ✅ | Agent mode for this request |
| `model` | `string` | ✅ | Must be a registered model ID |

**Response:** `200 OK` — Server-Sent Events stream (see [SSE Events](#sse-event-format) below)

**Errors:**
- `400` — Invalid request body (Zod validation failure)
- `404` — Session not found

---

### `POST /chat/:sessionId/resume`

Resume a session whose last message is from the user (no assistant reply yet). Useful for auto-resuming interrupted sessions or retrying after errors.

**Parameters:**

| Param | Type | Description |
| ----- | ---- | ----------- |
| `sessionId` | `string` (path) | Session CUID |

**Response:** `200 OK` — Server-Sent Events stream

**Errors:**
- `404` — Session not found
- `409` — No pending user message to resume / Unsupported model / Session already has an active resume

The server tracks active resume sessions in an in-memory `Set` to prevent duplicate concurrent streams for the same session.

---

## SSE Event Format

Both chat endpoints respond with Server-Sent Events. Each event has a named `event` type and a JSON `data` payload.

### `reasoning-delta`

Emitted when the model produces reasoning/thinking output (extended thinking).

```json
{
  "type": "reasoning-delta",
  "text": "Let me think about this..."
}
```

### `text-delta`

Emitted for each chunk of the model's text response.

```json
{
  "type": "text-delta",
  "text": "Here's what I found:"
}
```

### `tool_call`

Emitted when the model invokes a tool.

```json
{
  "type": "tool_call",
  "toolCallId": "tc_abc123",
  "toolName": "readFile",
  "args": {
    "path": "src/auth.ts"
  }
}
```

### `tool_result`

Emitted when a tool execution completes.

```json
{
  "type": "tool_result",
  "toolCallId": "tc_abc123",
  "result": "import { hash } from 'bcrypt';\n..."
}
```

### `done`

Emitted when the full response is complete and persisted.

```json
{
  "type": "done",
  "messageId": "clxyz789ghi",
  "durationMs": 4523
}
```

### `error`

Emitted when an error occurs during streaming.

```json
{
  "type": "error",
  "message": "Rate limit exceeded"
}
```

---

## Zod Validation Schemas

All request bodies are validated with Zod schemas using `@hono/zod-validator`. The validation schemas are defined inline in the route files. If validation fails, the route returns a `400` response with `{ "error": "Invalid request body" }` — the actual Zod issues are not exposed to the client.

### Message Parts Schema (`@koda-arc/shared`)

Message parts stored in the database `parts` JSON column follow this discriminated union:

```ts
type MessagePart =
  | { type: "reasoning"; text: string }
  | { type: "tool_call"; id: string; name: string; args: Record<string, unknown>; result?: string }
  | { type: "text"; text: string }
```

---

## Error Response Format

All non-SSE error responses follow a consistent structure:

```json
{
  "status": 404,
  "message": "Session not found",
  "path": "/sessions/invalid-id",
  "method": "GET"
}
```

For unhandled errors (500):

```json
{
  "error": "Internal server error"
}
```

---

## Available Tools

Tools are exposed to the AI model based on the agent state and whether a `cwd` is set on the session. All paths in tool arguments are relative to the session's working directory.

| Tool | Description | Input Schema | PLAN | BUILD |
| ---- | ----------- | ------------ | ---- | ----- |
| `readFile` | Read file contents (max 10K chars, truncated) | `{ path: string }` | ✅ | ✅ |
| `listDirectory` | List directory entries (skips hidden + node_modules) | `{ path?: string }` | ✅ | ✅ |
| `glob` | Find files by pattern (max 200 results) | `{ pattern: string, path?: string }` | ✅ | ✅ |
| `grep` | Regex search in files (max 50 matches) | `{ pattern: string, path?: string, include?: string }` | ✅ | ✅ |
| `gitHelper` | Git operations (status, diff, log, show, commit, branch) | `{ subcommand, message?, staged?, filePath?, count?, ref?, name?, create? }` | ✅ (read-only) | ✅ |
| `writeFile` | Create/overwrite files (creates parent dirs) | `{ path: string, content: string }` | ❌ | ✅ |
| `editFile` | Surgical string replacement (unique match required) | `{ path: string, oldString: string, newString: string }` | ❌ | ✅ |
| `bash` | Execute shell commands (max 20K output, 30s timeout) | `{ command: string, timeout?: number }` | ❌ | ✅ |

All tools enforce **path sandboxing**: resolved paths must start with the session's `cwd`. Any attempt to escape via `../` traversal returns an error.
