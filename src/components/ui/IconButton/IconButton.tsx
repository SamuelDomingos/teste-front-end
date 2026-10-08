import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './IconButton.scss';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export function IconButton({ label, className = '', children, ...rest }: IconButtonProps) {
  const classes = ['ui-icon-button', className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}
