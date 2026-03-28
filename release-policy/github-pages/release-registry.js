const {readFileSync} = require('node:fs');
const {validateReleaseRegistry} = require('../core/validate-release-registry');

const parseReleaseRegistry = (value) =>
  validateReleaseRegistry(
    JSON.parse(typeof value === 'string' ? value : readFileSync(value, 'utf8')),
  );

const loadReleaseRegistry = (
  registrySource = process.env.RELEASE_REGISTRY_JSON ?? 'release-registry.json',
) =>
  typeof registrySource === 'string' && registrySource.trim().startsWith('{')
    ? parseReleaseRegistry(registrySource)
    : parseReleaseRegistry(readFileSync(registrySource, 'utf8'));

module.exports = {
  loadReleaseRegistry,
  parseReleaseRegistry,
};
