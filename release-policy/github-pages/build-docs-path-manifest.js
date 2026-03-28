const {existsSync, readdirSync, readFileSync, statSync, writeFileSync} = require('node:fs');
const {join, relative} = require('node:path');

const collectDocsPaths = (rootDir, currentDir = rootDir) =>
  readdirSync(currentDir)
    .flatMap((entry) => {
      const absolutePath = join(currentDir, entry);
      const stats = statSync(absolutePath);

      if (stats.isDirectory()) {
        return collectDocsPaths(rootDir, absolutePath);
      }

      if (!entry.endsWith('.md') && !entry.endsWith('.mdx')) {
        return [];
      }

      const relativePath = relative(rootDir, absolutePath).replace(/\.(md|mdx)$/u, '');
      const normalizedPath = relativePath.replace(/\/index$/u, '').replace(/\\/gu, '/');

      return normalizedPath ? [normalizedPath] : [];
    })
    .sort((left, right) => left.localeCompare(right, 'en'));

const buildDocsPathManifest = ({
  loadedManifest,
  currentVersion,
  docsPaths,
}) => ({
  ...loadedManifest,
  [currentVersion]: docsPaths,
});

const buildDocsPathManifestCli = (args, {stdout = process.stdout} = {}) => {
  const [manifestPath, docsDir, currentVersion] = args;

  if (!manifestPath || !docsDir || !currentVersion) {
    throw new Error(
      'Usage: node scripts/build-docs-path-manifest.js <manifestPath> <docsDir> <currentVersion>',
    );
  }

  const loadedManifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : {};
  const docsPaths = collectDocsPaths(docsDir);
  const nextManifest = buildDocsPathManifest({
    loadedManifest,
    currentVersion,
    docsPaths,
  });

  writeFileSync(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  stdout.write(`${nextManifest[currentVersion].join(',')}\n`);

  return nextManifest;
};

module.exports = {
  buildDocsPathManifest,
  buildDocsPathManifestCli,
  collectDocsPaths,
};
