import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import {Button} from '@site/src/components/landing/Button';
import {Card} from '@site/src/components/landing/Card';
import {CodeExampleTabs} from '@site/src/components/landing/CodeExampleTabs';
import {Container} from '@site/src/components/landing/Container';
import {Section} from '@site/src/components/landing/Section';
import {
  architectureCards,
  codeTabs,
  featureItems,
  gettingStartedSteps,
  ideaPoints,
  problemPoints,
} from '@site/src/components/landing/content';
import styles from '@site/src/components/landing/landing.module.css';

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const {docsIntroPath, docsQuickStartPath} = siteConfig.customFields as {
    docsIntroPath: string;
    docsQuickStartPath: string;
  };
  const docsUrl = useBaseUrl(docsIntroPath);
  const getStartedUrl = useBaseUrl(docsQuickStartPath);

  return (
    <Layout
      title={siteConfig.title}
      description="KoalaTS landing page for structured Node.js backend development."
    >
      <main className={styles.page}>
        <Container>
          <section className={styles.hero}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>KoalaTS</p>
                <h1 className={styles.heroTitle}>
                  Build robust Node.js backends without overthinking
                </h1>
                <p className={styles.heroText}>
                  KoalaTS is a batteries-included framework that brings
                  structure, scalability, and functional programming into
                  real-world backend development.
                </p>
                <div className={styles.buttonRow}>
                  <Button to={docsUrl}>Read the Docs</Button>
                  <Button to={getStartedUrl} variant="secondary">
                    Get Started
                  </Button>
                </div>
              </div>
              <Card className={styles.heroCard}>
                <h2 className={styles.heroCardTitle}>Why teams reach for it</h2>
                <p className={styles.heroCardText}>
                  KoalaTS gives backend projects a clear starting point:
                  function-first routes, middleware for request flow, explicit
                  request and response handling, and utilities like request
                  scope storage when context needs to follow async work.
                </p>
                <ul className={styles.heroCardList}>
                  <li>Clear entry points for HTTP and application code</li>
                  <li>Practical defaults instead of repeated framework assembly</li>
                  <li>Patterns that stay readable as features and teams grow</li>
                </ul>
              </Card>
            </div>
          </section>

          <Section
            id="problem"
            eyebrow="Problem"
            title="Node backends don’t scale well by default"
          >
            <div className={styles.splitGrid}>
              <Card>
                <ul className={styles.copyList}>
                  {problemPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Card>
              <Card>
                <p className={styles.sectionDescription}>
                  Most Node backends work at first, then accumulate ad hoc
                  structure. Each team solves routing, validation, state, and
                  boundaries a little differently, which makes the code harder
                  to reason about over time.
                </p>
              </Card>
            </div>
          </Section>

          <Section
            id="idea"
            eyebrow="Idea"
            title="A structured way to build backends"
          >
            <div className={styles.splitGrid}>
              <Card>
                <p className={styles.sectionDescription}>
                  KoalaTS gives you a stable baseline built around explicit
                  routes, middleware, request and response primitives, and
                  predictable application structure. You spend less time
                  inventing conventions and more time building backend behavior.
                </p>
              </Card>
              <Card>
                <ul className={styles.copyList}>
                  {ideaPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </Section>

          <Section
            id="what-you-get"
            eyebrow="What You Get"
            title="The pieces you need to keep moving"
          >
            <div className={styles.featureGrid}>
              {featureItems.map((item) => (
                <Card key={item.title}>
                  <h3 className={styles.featureCardTitle}>{item.title}</h3>
                  <p className={styles.featureCardText}>{item.description}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            id="code-examples"
            eyebrow="Examples"
            title="A framework shape you can read quickly"
            description="KoalaTS keeps the surface area small: define routes explicitly and validate input with plain constraints that stay easy to read."
          >
            <CodeExampleTabs tabs={codeTabs} />
          </Section>

          <Section
            id="architecture"
            eyebrow="Architecture"
            title="Designed with architecture in mind"
          >
            <div className={styles.architectureGrid}>
              <Card>
                <p className={styles.sectionDescription}>
                  KoalaTS is influenced by the same ideas that make larger
                  systems maintainable: clear boundaries, explicit dependencies,
                  and a separation between transport concerns and application
                  behavior.
                </p>
                <ul className={styles.architectureList}>
                  <li>Inspired by DDD and Clean Architecture without turning them into ceremony.</li>
                  <li>Separation of concerns between HTTP handling, middleware, and application logic.</li>
                  <li>Code that stays easier to discuss, review, and evolve as a system.</li>
                </ul>
              </Card>
              <div className={styles.architectureCardGrid}>
                {architectureCards.map((card) => (
                  <Card key={card.title} className={styles.architectureDetailCard}>
                    <h3 className={styles.featureCardTitle}>{card.title}</h3>
                    <p className={styles.featureCardText}>{card.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="getting-started"
            eyebrow="Getting Started"
            title="Start small and keep the structure"
          >
            <div className={styles.stepsGrid}>
              {gettingStartedSteps.map((step, index) => (
                <Card key={step.title}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.body}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section className={styles.ctaSection}>
            <Card className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>
                Start building structured backends today
              </h2>
              <p className={styles.ctaText}>
                Start with the documentation when you want the full model, or
                jump into the quick start and build your first structured
                endpoint right away.
              </p>
              <div className={styles.buttonRow}>
                <Button to={docsUrl}>Read the Docs</Button>
                <Button to={getStartedUrl} variant="secondary">
                  Try KoalaTS
                </Button>
              </div>
            </Card>
          </Section>
        </Container>
      </main>
    </Layout>
  );
}
