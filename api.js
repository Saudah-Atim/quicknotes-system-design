const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadButton = document.getElementById("load-btn");
const statusMessage = document.getElementById("status");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitButton = document.getElementById("submit-btn");
const notesList = document.getElementById("notes-list");

let notes = [];

// Show a message and apply the matching CSS style.
function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

// Reusable function for sending API requests.
async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return {
        data: response.status === 204 ? null : await response.json(),
        status: response.status
    };
}

// Create a note card safely using textContent.
function createNoteElement(note) {
    const item = document.createElement("li");
    item.className = "note";
    item.dataset.id = String(note.id);

    const title = document.createElement("h3");
    title.textContent = note.title || "(Untitled note)";

    const body = document.createElement("p");
    body.textContent = note.body || "No body provided.";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", () => {
        deleteNote(note.id, deleteButton);
    });

    item.append(title, body, deleteButton);
    return item;
}

// Display the current notes or an empty-state message.
function renderNotes() {
    notesList.replaceChildren();

    if (notes.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = "No notes to display. Load notes or create one.";
        notesList.appendChild(emptyItem);
        return;
    }

    notes.forEach((note) => {
        notesList.appendChild(createNoteElement(note));
    });
}

// GET: Load 10 notes from the practice API.
async function loadNotes() {
    loadButton.disabled = true;
    showStatus("Loading notes...");

    try {
        const result = await request(`${API_URL}?_limit=10`);
        notes = result.data;
        renderNotes();

        if (notes.length === 0) {
            showStatus("No notes were found.", "success");
        } else {
            showStatus(`Loaded ${notes.length} notes from the server.`, "success");
        }
    } catch (error) {
        showStatus("Sorry, we couldn't load notes. Please try again.", "error");
        console.error("Load notes error:", error);
    } finally {
        loadButton.disabled = false;
    }
}

// POST: Create a note.
async function createNote(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title) {
        showStatus("Please enter a title for your note.", "error");
        titleInput.focus();
        return;
    }

    if (title.length > 100) {
        showStatus("The title must be 100 characters or fewer.", "error");
        titleInput.focus();
        return;
    }

    submitButton.disabled = true;
    showStatus("Creating note...");

    try {
        const result = await request(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

        const newNote = result.data;
        notes.unshift(newNote);
        renderNotes();

        showStatus(
            `Note created (status ${result.status}, id ${newNote.id}).`,
            "success"
        );

        noteForm.reset();
    } catch (error) {
        showStatus("Sorry, we couldn't create your note. Please try again.", "error");
        console.error("Create note error:", error);
    } finally {
        submitButton.disabled = false;
    }
}

// DELETE: Remove a note from the practice API.
async function deleteNote(id, button) {
    const previousText = button.textContent;
    button.disabled = true;
    button.textContent = "Deleting...";
    showStatus("Deleting note...");

    try {
        const result = await request(`${API_URL}/${encodeURIComponent(id)}`, {
            method: "DELETE"
        });

        // JSONPlaceholder simulates writes and deletes; it does not permanently
        // store changes. We remove the note locally after a successful response.
        notes = notes.filter((note) => String(note.id) !== String(id));
        renderNotes();

        showStatus(`Note deleted (status ${result.status}).`, "success");
    } catch (error) {
        button.disabled = false;
        button.textContent = previousText;
        showStatus("Sorry, we couldn't delete this note. Please try again.", "error");
        console.error("Delete note error:", error);
    }
}

// Connect the page controls to their functions.
loadButton.addEventListener("click", loadNotes);
noteForm.addEventListener("submit", createNote);

// Show an empty state when the page first opens.
renderNotes();