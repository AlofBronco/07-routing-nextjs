import { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';
import Link from 'next/link';

const SidebarNotes = () => {
  const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All
        </Link>
      </li>
      {tags.map(tag => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
