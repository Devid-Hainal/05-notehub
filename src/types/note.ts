export interface Note {
  id: string;
  tag: NoteTag;
  title: string;
  content: string;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface CreateNoteProps {
  tag: NoteTag;
  title: string;
  content: string;
}
