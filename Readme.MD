# Notes API

A clean, scalable CRUD API for managing notes, built with TypeScript and Express - designed around a strict Controller -> Service -> Store architecture with centralized error handling and validation as middleware.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Validation:** Zod
- **Logging:** Pino / pino-http
- **Security:** Helmet

## Architecture

Request -> Pino-http (request logging) -> helmet (security headers) -> express.json() -> Router(/api/v1/notes) -> validate(schema) -> Controller -> Service -> Store -> errors bubble up via next(err) -> errorHandler

**Design Principles:**

- **Controllers** never contain business logic - they translate http service calls.
- **Services** own business rules and are the only layer that throws domain errors (`NotFoundError`,etc.)
- **Stores** are dumb - no HTTP or business knowledge, just data access + pagination.
- **All errors** flow through one centralized handler via `next(err)`, keyed off a custom `AppError` hierarchy with an `isOperational` flag to distinguish expected failures from real bugs.

## Getting Started

```shell
$ npm install
$ npm run dev
```

Server starts at `http://localhost:<PORT>` (PORT reads from `.env`).

API docs: `http://localhost:<PORT>/docs`
Health check: `GET /api/health`

## API Endpoints

| Method | Route               | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | `/api/v1/notes`     | Create a note           |
| GET    | `/api/v1/notes`     | List notes (paginated)  |
| GET    | `/api/v1/notes/:id` | Get a note by ID        |
| PATCH  | `/api/v1/notes/:id` | Update a note (partial) |
| DELETE | `/api/v1/notes/:id` | Delete a note           |

Full request/response schema available at `/docs`
