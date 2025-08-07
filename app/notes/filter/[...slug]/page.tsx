import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';

interface NotesPageProps {
  params: Promise<{ slug: NoteTag[] | ['All'] }>;
}

const NotesPage = async ({ params }: NotesPageProps) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const query = '';
  const currentPage = 1;

  const tag = slug[0] === 'All' ? undefined : slug[0];

  const response = await fetchNotes(query, currentPage, tag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, currentPage, tag],
    queryFn: () => fetchNotes(query, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={response} tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
