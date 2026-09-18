import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch every note once, on initial mount.
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Check that it is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Add a title and some content before saving.");
      return;
    }

    try {
      const res = await axios.post(API_URL, { title, content });
      // Newest first, matching the server ordering.
      setNotes([res.data, ...notes]);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not save the note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Sync local state so the note disappears without a page refresh.
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete the note.");
    }
  };

  const formatDate = (value) =>
    new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="page">
      <header>
        <h1>Student Notes</h1>
        <p className="subtitle">React + Express + MongoDB</p>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Write the note here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add note</button>
      </form>

      {error && <p className="error">{error}</p>}

      <section className="note-list">
        {loading ? (
          <p className="status">Loading notes…</p>
        ) : notes.length === 0 ? (
          <p className="status">No notes yet — add one above!</p>
        ) : (
          notes.map((note) => (
            <article className="note-card" key={note._id}>
              <div className="note-body">
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <span className="timestamp">{formatDate(note.createdAt)}</span>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(note._id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
