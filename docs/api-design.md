QuickNotes API Design

1. API Endpoints

| Method | Endpoint | Description | Success Status Code |
|---|---|---|---|
| GET | `/api/notes` | Gets all notes | 200 OK |
| GET | `/api/notes/1` | Gets one note by ID | 200 OK |
| POST | `/api/notes` | Creates a new note | 201 Created |
| PUT | `/api/notes/1` | Replaces an existing note | 200 OK |
| PATCH | `/api/notes/1` | Updates part of a note | 200 OK |
| DELETE | `/api/notes/1` | Deletes a note | 204 No Content |
| GET | `/api/users/1/notes` | Gets all notes for a user | 200 OK |

2. Request and Response Examples

Create a Note

Method: POST

Endpoint: /api/notes

Request:

```json
{
  "title": "My Study Notes",
  "body": "Learning how APIs work.",
  "userId": 1
}
```

Response: 201 Created

```json
{
  "id": 101,
  "title": "My Study Notes",
  "body": "Learning how APIs work.",
  "userId": 1
}
```

The server creates the note and returns its new ID.

Get All Notes

Method: GET

```json
[
  {
    "id": 1,
    "title": "First Note",
    "body": "This is my first note.",
    "userId": 1
  },
  {
    "id": 2,
    "title": "Second Note",
    "body": "This is my second note.",
    "userId": 1
  }
]
```

The server returns a list of notes.

3. HTTP Status Codes

| Status Code | Meaning | Description |
|---|---|---|
| 200 OK | Successful request | The request worked and the server returned the information. |
| 201 Created | Resource created | A new note was created successfully. |
| 204 No Content | Successful deletion | The note was deleted and no response body is returned. |
| 400 Bad Request | Invalid information | The request contains missing or incorrect information. |
| 401 Unauthorized | Login required | The user has not provided valid login details. |
| 403 Forbidden | Access denied | The user does not have permission to access the note. |
| 404 Not Found | Resource missing | The requested note does not exist. |
| 500 Internal Server Error | Server problem | Something went wrong on the server. |

4. Error Response Example

If a user tries to create a note without a title, the server returns a 400 Bad Request response.

Response: 400 Bad Request

{
  "error": "Bad Request",
  "message": "The note title is required."
}

5. Input Validation

Before creating or updating a note, the API checks that:

The title is not empty.

The title is not longer than 100 characters.

The note ID is valid when updating or deleting a note.

The user has permission to manage the note.