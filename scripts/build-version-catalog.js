/**
 * Purpose: maintain the shared published versions catalog used by navbar version navigation.
 * Usage: `node scripts/build-version-catalog.js <catalogPath> <currentVersion>`.
 */
const {existsSync, readFileSync, writeFileSync} = require('node:fs');

const [catalogPath, currentVersion] = process.argv.slice(2);

if (!catalogPath || !currentVersion) {
  throw new Error(
    'Usage: node scripts/build-version-catalog.js <catalogPath> <currentVersion>',
  );
}

const loaded = existsSync(catalogPath)
  ? JSON.parse(readFileSync(catalogPath, 'utf8'))
  : [];

const isAllowedVersion = (version) =>
  version === 'next' || /^[a-z0-9._-]+\.x$/.test(version);

const merged = [...new Set([...loaded, currentVersion])]
  .filter(isAllowedVersion)
  .sort((a, b) => {
    if (a === 'next') {
      return -1;
    }

    if (b === 'next') {
      return 1;
    }

    return a.localeCompare(b, 'en');
  });

writeFileSync(catalogPath, `${JSON.stringify(merged, null, 2)}\n`);
process.stdout.write(`${merged.join(',')}\n`);
