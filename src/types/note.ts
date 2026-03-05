export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  tag: NoteTag;
  title: string;
  content: string;
}

export interface NewNoteData {
  tag: string;
  title: string;
  content: string;
}
