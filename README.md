# Student Notes — MERN CRUD Micro-App

A two-tier notes application built for the Full-Stack Cloud Architectures lab. The Express API
persists notes in MongoDB through Mongoose; the React client creates, lists and deletes them
without a page refresh.

## Candidate details

| Field | Value |
| --- | --- |
| Name | *your name* |
| Student ID | *your student ID* |
| Course / Section | *your course and section* |
| GitHub repository | *paste your repository link* |

## Stack

- **Server:** Node.js, Express 4, Mongoose 8, CORS
- **Client:** React 18, Vite 5, Axios
- **Database:** MongoDB running locally at `mongodb://localhost:27017/notes_db`

## Prerequisites

- Node.js 18 or newer
- A local MongoDB daemon listening on port 27017 (`mongod`)

## Setup

Clone the repository, then install each tier separately.

### 1. Backend (port 5000)

```bash
cd server
npm install
npm start
```

Expected terminal output:

```
Express server listening on http://localhost:5000
MongoDB connected: localhost/notes_db
```

If MongoDB is not running, the `.catch()` on the connection prints a clear failure message
instead of crashing silently.

### 2. Frontend (port 5173)

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Then visit <http://localhost:5173>.

## API reference

Base URL: `http://localhost:5000/api/notes`

| Method | Endpoint | Body | Success | Notes |
| --- | --- | --- | --- | --- |
| POST | `/api/notes` | `{ "title": "...", "content": "..." }` | `201 Created` | Returns the saved note |
| GET | `/api/notes` | — | `200 OK` | Sorted by `createdAt` descending |
| DELETE | `/api/notes/:id` | — | `200 OK` | `404 Not Found` if the id does not exist |

### Sample request

```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Lab 5","content":"Finish the CRUD micro-app."}'
```

## Data model

```js
{
  title:     String,  // required
  content:   String,  // required
  createdAt: Date     // defaults to Date.now
}
```

## Cross-origin configuration

The client runs on port 5173 and the API on port 5000, so `cors()` is mounted in `server.js`
before the route handlers. Without it the browser blocks every Axios request with a CORS error.

## Project structure

```
notes-app/
|-- .gitignore
|-- README.md
|-- screenshots/
|   |-- ui-preview.png          # Browser view with notes rendered
|   |-- delete-action.png       # DevTools Network tab showing DELETE 200 OK
|-- server/
|   |-- config/db.js            # Mongoose connection logic
|   |-- models/Note.js          # Schema and model
|   |-- routes/noteRoutes.js    # REST handlers
|   |-- package.json
|   |-- server.js               # Entry point and middleware
|-- client/
    |-- index.html
    |-- vite.config.js
    |-- package.json
    |-- src/
        |-- App.jsx             # State, form and note list
        |-- main.jsx            # React DOM root
        |-- index.css           # Styling
```

## Verification screenshots

- `screenshots/ui-preview.png` — at least two notes rendered in the browser.
- `screenshots/delete-action.png` — the DevTools Network tab after a delete, showing
  `200 OK` on `DELETE /api/notes/:id`.

## Submission checklist

- [ ] Both servers run with `npm start` and `npm run dev`
- [ ] All three endpoints tested in Postman / Thunder Client
- [ ] Two screenshots saved in `screenshots/`
- [ ] Candidate details and GitHub link filled in above
- [ ] Zipped as `StudentID_MERN_Lab.zip` without `node_modules/` or `dist/`
