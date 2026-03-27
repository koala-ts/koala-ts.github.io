import React from 'react';
import styles from './landing.module.css';

type CardProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

export function Card({
  children,
  className = '',
}: CardProps): React.JSX.Element {
  const combinedClassName = className
    ? `${styles.card} ${className}`
    : styles.card;

  return <div className={combinedClassName}>{children}</div>;
}
