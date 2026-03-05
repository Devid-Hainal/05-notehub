import css from "./App.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({ queryKey: ["notes"], queryFn: fetchNotes });
  const notes = data?.notes ?? [];
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}

        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClick={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
