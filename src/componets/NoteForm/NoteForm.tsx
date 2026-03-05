import type { NewNoteData } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClick: () => void;
}
const NoteForm = ({ onClick }: NoteFormProps) => {
  const queryClinet = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteData: NewNoteData) => createNote(noteData),
    onSuccess() {
      queryClinet.invalidateQueries({ queryKey: ["notes"] });
      onClick();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values: NewNoteData = {
      tag: formData.get("tag") as string,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };
    mutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className={css.input} />
        <span className={css.error}></span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        <span className={css.error}></span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} defaultValue="Todo">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error}></span>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClick}>
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};
export default NoteForm;
