import React from 'react';
import styles from './landing.module.css';

type ContainerProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

export function Container({
  children,
  className = '',
}: ContainerProps): React.JSX.Element {
  const combinedClassName = className
    ? `${styles.container} ${className}`
    : styles.container;

  return <div className={combinedClassName}>{children}</div>;
}
