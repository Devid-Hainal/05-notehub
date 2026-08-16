import axios from "axios";
import type { CreateNoteProps, Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const notesApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await notesApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search.trim() !== "" && { search: search.trim() }),
    },
  });
  return data;
};

export const createNote = async (noteData: CreateNoteProps) => {
  const { data } = await notesApi.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (notesId: string) => {
  const response = await notesApi.delete(`/notes/${notesId}`);
  return response.data;
};
