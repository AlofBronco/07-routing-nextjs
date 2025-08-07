'use client';

import { NoteTag } from '@/types/note';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { useState } from 'react';

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
        Notes ▾
      </button>
      {isOpen && (
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
      )}
    </div>
  );
};

export default TagsMenu;
