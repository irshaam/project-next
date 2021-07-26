# Project Next

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Adding Dependencies

- If common use `lerna add <package>` or `lerna add <package> --dev` incase for dev depedencies.
- If specific to an app `lerna add <package> --scope=<app>` or `lerna add <package> --scope=<app> --dev` in case for dev dependencies.

## Commits

We are using the following conventions to identify what the commit is doing:

- **FEAT**: A new feature.
- **FIX**: A bug fix.
- **DOCS**: Changes to documentation
- **STYLE**: Formatting, missing semi colons, etc; no code change.
- **REFACTOR**: Refactor: refactoring production code.
- **TEST**: Adding tests, refactoring test; no production code change
- **CHORE**: updating build tasks, package manager configs, etc; no production code change.
- **BUILD**: Changes to build config, a new release.
