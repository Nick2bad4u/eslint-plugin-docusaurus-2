# First release checklist

Maintainer checklist for the first public `eslint-plugin-docusaurus-2` release.

## Package and surface checks

- [ ] `npm run build`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run lint:all:fix:quiet`
- [ ] `npm run lint:package:strict`
- [ ] `npm pack --dry-run`

## Docs and generated surface checks

- [ ] `npm run docs:build`
- [ ] `npm run docs:check-links`
- [ ] `npm run sync:readme-rules-table`
- [ ] `node scripts/sync-presets-rules-matrix.mjs --check`

## Changelog and release notes

- [ ] Review `CHANGELOG.md`
- [ ] Review `npm run changelog:release-notes`
- [ ] Confirm the first public release narrative matches the actual shipped rule surface

## Publish readiness

- [ ] Confirm package version is correct
- [ ] Confirm README installation and config examples still match shipped exports
- [ ] Confirm homepage / bugs / repository metadata are correct
- [ ] Confirm no local-only files are staged for release

## Optional follow-up

- [ ] Review coverage hotspots after the release if you want another quality pass
- [ ] Decide whether to publish a separate release announcement or migration guide
