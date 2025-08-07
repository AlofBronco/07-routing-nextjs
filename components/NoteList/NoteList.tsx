import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onMutate: (noteId: string) => {
      setDeletingNoteId(noteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onSettled: () => {
      setDeletingNoteId(null);
    },
  });

  const handleDelete = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              onClick={() => handleDelete(note.id)}
              className={css.button}
              disabled={deletingNoteId === note.id && deleteNoteMutation.isPending}
            >
              {deletingNoteId === note.id && deleteNoteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
