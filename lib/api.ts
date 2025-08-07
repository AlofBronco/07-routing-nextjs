import axios from 'axios';
import type { NewNote, Note } from '@/types/note';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (query: string, page: number): Promise<FetchNotesResponse> => {
  try {
    const res = await axios.get<FetchNotesResponse>('/notes', {
      params: {
        search: query,
        page,
      },
    });
    return res.data;
  } catch {
    throw new Error('Error fetching notes');
  }
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  try {
    const res = await axios.get<Note>(`/notes/${noteId}`);
    return res.data;
  } catch {
    throw new Error('Error fetching note');
  }
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  try {
    const res = await axios.post<Note>('/notes', noteData);
    return res.data;
  } catch {
    throw new Error('Error creating note');
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
    const res = await axios.delete<Note>(`/notes/${noteId}`);
    return res.data;
  } catch {
    throw new Error('Error deleting note');
  }
};
