const noteService = require('../service/note')

class NoteController {
    async createNote(req, res) {
        try {
            const id = await noteService.createNote(req.payload);
            return res.response({ id }).code(201);
        } catch (err) {
            console.error(err);
            throw err; // Rethrow the error to propagate it to the caller
        }
    }

    async deleteNoteById(req, res, noteId) {
        try {
            await noteService.deleteNoteById(noteId);
            return res.response().code(204); // No content for successful deletion
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete note');
        }
    }

    async updateNoteById(req, res, noteId, updatedNoteData) {
        try {
            await noteService.updateNoteById(noteId, updatedNoteData);
            return res.response(); // Return a response to indicate successful update
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update note');
        }
    }

    async getAllNotes(req, res) {
        try {
            const notes = await noteService.getAllNotes();
            return notes;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to retrieve notes');
        }
    }

    async searchNotes(request, h) {
        try {
            const { title, tag } = request.query;

            if (title) {
                const notes = await noteService.getNotesByTitle(title);
                return h.response(notes).code(200);
            } else if (tag) {
                const notes = await noteService.getNotesByTag(tag);
                return h.response(notes).code(200);
            } else {
                // Handle case when neither title nor tag is provided
                return h.response({ error: 'Missing title or tag parameter' }).code(400);
            }
        } catch (err) {
            console.error(err);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}


module.exports = new NoteController();