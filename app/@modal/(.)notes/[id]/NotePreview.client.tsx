'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Note } from '@/types/note';

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNoteById(id)
      .then(setNote)
      .catch(() => router.back());
  }, [id, router]);

  if (!note)
    return (
      <Modal onClose={() => {}}>
        <p>Loading note...</p>
      </Modal>
    );

  const formattedDate = note?.updatedAt ? `Updated at: ${note?.updatedAt}` : `Created at: ${note?.createdAt}`;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
