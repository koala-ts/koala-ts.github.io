/**
 * Purpose: maintain the shared published docs-path manifest used for version-aware navigation.
 * Usage: `node scripts/build-docs-path-manifest.js <manifestPath> <docsDir> <currentVersion>`.
 */
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

if (require.main === module) {
  const [manifestPath, docsDir, currentVersion] = process.argv.slice(2);

  if (!manifestPath || !docsDir || !currentVersion) {
    throw new Error(
      'Usage: node scripts/build-docs-path-manifest.js <manifestPath> <docsDir> <currentVersion>',
    );
  }

  const loadedManifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : {};

  const nextManifest = {
    ...loadedManifest,
    [currentVersion]: collectDocsPaths(docsDir),
  };

  writeFileSync(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  process.stdout.write(`${nextManifest[currentVersion].join(',')}\n`);
}

module.exports = {
  collectDocsPaths,
};
