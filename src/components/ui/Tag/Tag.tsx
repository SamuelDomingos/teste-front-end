import type { ButtonHTMLAttributes } from 'react';
import './Tag.scss';

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Tag({ active = false, className = '', children, ...rest }: TagProps) {
  const classes = ['ui-tag', active ? 'ui-tag--active' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} aria-pressed={active} {...rest}>
      {children}
    </button>
  );
}
