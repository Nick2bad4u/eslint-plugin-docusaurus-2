---
title: Maintainer Overview
slug: /developer
---

import ArchitectureImage from "@site/static/img/architecture.png";
import SlashUpAndRunningImage from "@site/static/img/slash-up-and-running.png";

# Maintainer Overview

The Docusaurus workspace exists to document the plugin, host generated API pages, and keep rule/preset guidance easy to navigate.

<img alt="Docusaurus slash character getting up and running" className="doc-showcase-image doc-showcase-image--compact" src={SlashUpAndRunningImage} />

## Current maintainer priorities

1. keep the public preset surface stable
2. add real Docusaurus-specific rules
3. keep TypeDoc output and authored docs separate
4. validate docs builds and links continuously

## Current documentation surfaces to keep aligned

- `README.md` for package-facing installation and rule tables
- `docs/rules/**` for authored rule docs and preset guidance
- `docs/docusaurus/site-docs/**` for maintainer-facing guides and architecture notes
- generated API pages under `docs/docusaurus/site-docs/developer/api/**`

When the rule catalog changes, update the authored docs first, then rerun the sync scripts for the README rules section and preset matrix.

For stronger TypeDoc-specific linting beyond the Docusaurus integration concerns this plugin covers, pair the docs site with `eslint-plugin-typedoc`.

## Architecture snapshot

<img alt="High-level Docusaurus architecture diagram showing plugins, themes, bundling, and runtime outputs" className="doc-showcase-image" src={ArchitectureImage} />
