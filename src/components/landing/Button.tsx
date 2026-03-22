import React from 'react';
import Link from '@docusaurus/Link';
import styles from './landing.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  readonly children: React.ReactNode;
  readonly to: string;
  readonly variant?: ButtonVariant;
};

export function Button({
  children,
  to,
  variant = 'primary',
}: ButtonProps): React.JSX.Element {
  const className =
    variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;

  return (
    <Link className={`${styles.button} ${className}`} to={to}>
      {children}
    </Link>
  );
}
