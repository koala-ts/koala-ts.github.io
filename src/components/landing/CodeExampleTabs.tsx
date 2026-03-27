import React, {useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './landing.module.css';

type CodeTab = {
  readonly label: string;
  readonly code: string;
  readonly language: string;
};

type CodeExampleTabsProps = {
  readonly tabs: readonly CodeTab[];
};

export function CodeExampleTabs({
  tabs,
}: CodeExampleTabsProps): React.JSX.Element {
  const [activeTabLabel, setActiveTabLabel] = useState(tabs[0]?.label ?? '');

  const activeTab =
    tabs.find((tab) => tab.label === activeTabLabel) ?? tabs[0] ?? null;

  return (
    <div className={styles.codeTabs}>
      <div className={styles.tabList} role="tablist" aria-label="Code examples">
        {tabs.map((tab) => {
          const isActive = tab.label === activeTab?.label;

          return (
            <button
              key={tab.label}
              type="button"
              className={isActive ? styles.tabButtonActive : styles.tabButton}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabLabel(tab.label)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTab ? (
        <div className={styles.codePanel} role="tabpanel">
          <CodeBlock language={activeTab.language}>{activeTab.code}</CodeBlock>
        </div>
      ) : null}
    </div>
  );
}
