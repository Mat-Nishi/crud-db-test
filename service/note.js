const noteDAO = require('../dao/note')

class NoteService{
    createNote(noteDto){
        const { title, body, tag } = noteDto;
        return noteDAO.createNote(title, body, tag);
    }

    deleteNoteById(noteId) {
        try {
            // Implement note deletion logic using NoteDAO or your preferred database access method
            return noteDAO.deleteNoteById(noteId);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete note from the database');
        }
    }

    async updateNoteById(noteId, updatedNoteData) {
        try {
            // Implement note update logic using NoteDAO or your preferred database access method
            await noteDAO.updateNoteById(noteId, updatedNoteData);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update note in the database');
        }
    }

    async getAllNotes() {
        try {
            const notes = await noteDAO.getAllNotes();
            return notes;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to retrieve notes from the database');
        }
    }
    async getNotesByTitle(title) {
        try {
            const notes = await noteDAO.getNotesByTitle(title);
            return notes;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to retrieve notes by title from the database');
        }
    }

    async getNotesByTag(tag) {
        try {
            const notes = await noteDAO.getNotesByTag(tag);
            return notes;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to retrieve notes by tag from the database');
        }
    }
}

module.exports = new NoteService();