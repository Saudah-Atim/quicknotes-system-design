QuickNotes Data Model

1. Database Tables

The QuickNotes system will use four tables: users, notes, tags and note_tags.

Users Table

This table stores information about users.

Column

Data Type

Key

id

INTEGER

Primary Key

name

TEXT



email

TEXT

Unique

created_at

TEXT



Notes Table

This table stores the notes created by users.

Column

Data Type

Key

id

INTEGER

Primary Key

user_id

INTEGER

Foreign Key

title

TEXT



body

TEXT



created_at

TEXT



updated_at

TEXT



Tags Table

This table stores tags that can be used to organise notes.

Column

Data Type

Key

id

INTEGER

Primary Key

name

TEXT

Unique

Note_Tags Table

This table connects notes to their tags.

Column

Data Type

Key

note_id

INTEGER

Primary Key and Foreign Key

tag_id

INTEGER

Primary Key and Foreign Key

2. Relationships

One user can create many notes.

Each note belongs to one user.

One note can have many tags.

One tag can be used on many notes.

The note_tags table connects notes and tags.

3. SQL Table Creation

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

4. SQL Queries

Get all notes:

SELECT * FROM notes;

Get notes belonging to one user:

SELECT * FROM notes
WHERE user_id = 1;

Get notes together with their tags:

SELECT notes.title, tags.name
FROM notes
JOIN note_tags ON notes.id = note_tags.note_id
JOIN tags ON note_tags.tag_id = tags.id;

5. Database Index

CREATE INDEX idx_notes_user_id
ON notes(user_id);

This index helps the database find notes belonging to a particular user faster.

6. SQL vs NoSQL

I would use an SQL database for QuickNotes because the system has related tables such as users, notes and tags. SQL helps organise this information and connect the tables using keys.