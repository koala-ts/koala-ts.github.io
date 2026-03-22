import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Branch-Based Docs Versions',
    description:
      'Publish each maintained branch under its own stable URL and switch between versions directly from the navbar.',
  },
  {
    title: 'Fast Backend Onboarding',
    description:
      'Start with focused guides for configuration, routing, requests, responses, and static asset serving.',
  },
  {
    title: 'Framework Primitives',
    description:
      'Use request scope storage and HTTP abstractions without burying your application in framework ceremony.',
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
