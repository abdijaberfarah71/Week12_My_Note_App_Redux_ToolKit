import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotes = createAsyncThunk("fetch/Notes", async () => {
  const response = await axios.get("http://localhost:9000/notes");
  return response.data;
});
export const createNote = createAsyncThunk("create/Note", async (note) => {
  const response = await axios.post("http://localhost:9000/create_note", note);
  return response.data;
});

export const updateNotes = createAsyncThunk(
  "update/note",
  async ({ noteId, updateNote }) => {
    const response = await axios.put(
      `http://localhost:9000/update_note/${noteId}`,
      updateNote
    );

    return response.data;
  }
);

export const deleteNote = createAsyncThunk("delete/note", async (noteId) => {
  await axios.delete(`http://localhost:9000/delete_note/${noteId}`);
  return noteId;
});

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

export const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const noteId = action.payload;
        state.notes = state.notes.filter((note) => note.id !== Number(noteId));
      })
      .addCase(deleteNote.rejected, (state) => {
        state.status = "failed";
        state.error = null;
      })
      .addCase(updateNotes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateNotes.fulfilled, (state, action) => {
        const { id, title, content } = action.payload;

        const existsNote = state.notes.find((note) => note.id === Number(id));

        if (existsNote) {
          existsNote.title = title;
          existsNote.content = content;
        }
      })
      .addCase(updateNotes.rejected, (state) => {
        state.status = "failed";
        state.error = null;
      });
  },
});

export default NoteSlice.reducer;
