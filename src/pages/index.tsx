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
  const {docsIntroPath} = siteConfig.customFields as {
    docsIntroPath: string;
  };
  const docsUrl = useBaseUrl(docsIntroPath);
  const getStartedUrl = useBaseUrl('/docs/get-started/configuration');

  return (
    <Layout
      title={siteConfig.title}
      description="KoalaTS 1.x documentation for controller-based Node.js backend development."
    >
      <main className={styles.page}>
        <Container>
          <section className={styles.hero}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>KoalaTS</p>
                <h1 className={styles.heroTitle}>
                  Build controller-based Node.js backends with less ceremony
                </h1>
                <p className={styles.heroText}>
                  KoalaTS 1.x gives you an opinionated starting point for
                  controllers, routes, requests, responses, and application
                  configuration without forcing you to assemble the stack from
                  scratch.
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
                  KoalaTS 1.x gives backend projects a clear starting point:
                  controller methods define routes, the request scope exposes
                  transport data, and configuration stays predictable across
                  environments.
                </p>
                <ul className={styles.heroCardList}>
                  <li>Explicit controller registration and routing</li>
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
            description="KoalaTS 1.x keeps the surface area small: define routes on controllers and manage runtime configuration with familiar environment files."
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
                  <li>Controllers keep HTTP handling explicit without hiding behavior.</li>
                  <li>Configuration remains readable through layered environment files.</li>
                  <li>Code stays easier to discuss, review, and evolve as a system.</li>
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
                jump into configuration and build your first structured
                endpoint with the documented `1.x` patterns.
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
