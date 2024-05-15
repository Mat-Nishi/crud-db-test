// curl -X POST -H "Content-Type:application/json" -d "{\"title\":\"<value>\", \"body\":\"<value>\", \"tag\":\"<value>\"}" http://localhost:3000/notes

const Hapi = require('@hapi/hapi');
const NoteController = require('./controller/note')

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/notes',
        handler: (request, h) => {
            return notes;
        }
    });

    server.route({
        method: 'GET',
        path: '/notesdb',
        handler: async (request, h) => {
            try {
                const notes = await NoteController.getAllNotes(request, h);
                return h.response(notes).code(200);
            } catch (err) {
                console.error(err);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/notesdb/search',
        handler: async (request, h) => {
            return await NoteController.searchNotes(request, h);
        }
    });

    server.route({
        method: 'POST',
        path: '/notes',
        handler: (request, h) => {
            const newNote = request.payload;
            notes.push(newNote);
            return notes;
        }
    });

    server.route({
        method: 'POST',
        path: '/notesdb',
        handler: async (request, h) => {
            try {
                return await NoteController.createNote(request, h);
            } catch (err) {
                console.error(err);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/notes/{index}',
        handler: (request, h) => {
            const index = request.params.index;
            const { title, body, tag } = request.payload;
            notes[index] = { title, body, tag };
            return notes;
        }
    });

    server.route({
        method: 'PUT',
        path: '/notesdb/{id}',
        handler: async (request, h) => {
            try {
                const noteId = request.params.id;
                const updatedNoteData = request.payload;
                await NoteController.updateNoteById(request, h, noteId, updatedNoteData);
                return h.response().code(200);
            } catch (err) {
                console.error(err);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/notes/{index}',
        handler: (request, h) => {
            const index = request.params.index;
            notes.splice(index, 1);
            return notes;
        }
    });

    server.route({
        method: 'DELETE',
        path: '/notesdb/{id}',
        handler: async (request, h) => {
            try {
                const noteId = request.params.id;
                return await NoteController.deleteNoteById(request, h, noteId);
            } catch (err) {
                console.error(err);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

const notes = [{"title": "Note1", "body": "lorem ipsum", "tag": "test"},{"title": "Note2", "body": "dolor sit amet", "tag": "test"}];

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
