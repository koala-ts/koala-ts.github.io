const {existsSync, readFileSync, writeFileSync} = require('node:fs');

const isAllowedVersion = (version) =>
  version === 'next' || /^[0-9]+\.x$/.test(version);

const buildVersionCatalog = ({loadedVersions, currentVersion}) => {
  const merged = [...new Set([...loadedVersions, currentVersion])]
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

  return {
    merged,
    versionCsv: merged.join(','),
  };
};

const buildVersionCatalogCli = (args, {stdout = process.stdout} = {}) => {
  const [versionsPath, currentVersion] = args;

  if (!versionsPath || !currentVersion) {
    throw new Error(
      'Usage: internal buildVersionCatalogCli(<versionsPath> <currentVersion>)',
    );
  }

  const loadedVersions = existsSync(versionsPath)
    ? JSON.parse(readFileSync(versionsPath, 'utf8'))
    : [];
  const {merged, versionCsv} = buildVersionCatalog({
    loadedVersions,
    currentVersion,
  });

  writeFileSync(versionsPath, `${JSON.stringify(merged, null, 2)}\n`);
  stdout.write(`${versionCsv}\n`);

  return {
    merged,
    versionCsv,
  };
};

module.exports = {
  buildVersionCatalog,
  buildVersionCatalogCli,
  isAllowedVersion,
};
