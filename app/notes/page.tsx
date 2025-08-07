import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

const NotesPage = async () => {
  const queryClient = new QueryClient();

  const query = '';
  const currentPage = 1;

  const response = await fetchNotes(query, currentPage);

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={response} />
    </HydrationBoundary>
  );
};

export default NotesPage;
