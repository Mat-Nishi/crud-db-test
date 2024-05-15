const db = require('../db/db');

class NoteDAO{
    async createNote(title, body, tag){
        const [id] = await db('note').insert({
            title: title,
            body: body,
            tag: tag
        }).returning('id');

        return id;
    }

    async deleteNoteById(id) {
        try {
            await db('note').where({ id }).del();
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete note from the database');
        }

        return id;
    }

    async updateNoteById(noteId, updatedNoteData) {
        try {
            await db('note').where({ id: noteId }).update(updatedNoteData);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update note in the database');
        }
    }

    async getAllNotes() {
        try {
            // Implement logic to fetch all notes from the database
            const notes = await db('note').select('*');
            return notes;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to retrieve notes from the database');
        }
    }

    async getNotesByTitle(title) {
        try {
            // Implement logic to fetch notes by title from the database
            const notes = await db('note').where('title', 'like', `%${title}%`);
            return notes;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to retrieve notes by title from the database');
        }
    }

    async getNotesByTag(tag) {
        try {
            // Implement logic to fetch notes by title from the database
            const notes = await db('note').where('tag', 'like', `%${tag}%`);
            return notes;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to retrieve notes by tag from the database');
        }
    }

}

module.exports = new NoteDAO();