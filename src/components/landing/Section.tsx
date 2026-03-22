import React from 'react';
import styles from './landing.module.css';

type SectionProps = {
  readonly id?: string;
  readonly title?: string;
  readonly eyebrow?: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
};

export function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  className = '',
}: SectionProps): React.JSX.Element {
  const combinedClassName = className
    ? `${styles.section} ${className}`
    : styles.section;

  return (
    <section className={combinedClassName} id={id}>
      {(eyebrow || title || description) && (
        <div className={styles.sectionHeader}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          {title ? <h2 className={styles.sectionTitle}>{title}</h2> : null}
          {description ? (
            <p className={styles.sectionDescription}>{description}</p>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}
