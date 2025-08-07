import css from "./FilterLayout.module.css"

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const FilterLayout = ({ children, sidebar }: FilterLayoutProps) => {
  return (
    <div className={css.container}>
      <div className={css.notesWrapper}>{children}</div>
      <div className={css.sidebar}>{sidebar}</div>
    </div>
  );
};

export default FilterLayout;
