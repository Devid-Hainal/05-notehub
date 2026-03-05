import axios from "axios";
import type { NewNoteData, Note } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages?: number;
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const instanceNote = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${myKey}` },
});

export const fetchNotes = async () => {
  const response = await instanceNote.get<FetchNotesResponse>("/notes");
  console.log(response);

  return response.data;
};

export const createNote = async (noteData: NewNoteData) => {
  const response = await instanceNote.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  await instanceNote.delete(`/notes/${noteId}`);
};
