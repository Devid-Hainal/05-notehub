import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { FetchNotesResponse } from "../../services/noteService";
import css from "./NoteList.module.css";

const NoteList = ({ notes }: FetchNotesResponse) => {
  const queryClinet = useQueryClient();
  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess() {
      queryClinet.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}t</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
