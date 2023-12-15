import express from 'express';

import { getNotes, createNote, getNote } from './database.js';
const app = express();
app.use(express.json());
app.get("/notes", async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
});

app.get("/notes:id", async (req, res) => {
    const id = req.params.id;
    const note = await getNote(id);
    res.send(note);
});


app.post("/notes", async (req, res) => {
    const { title, content } = req.body;
    const note = await createNote(title, content);
    res.status(201).send(note);
});

app.use((err, req, res, next) => {
    console.err(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(8080, () => {
    console.log('Server is runing on port 8080');
});
