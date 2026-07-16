# Changelog

All notable changes to this project are documented in this file.

## 3.0.1 - 2026-07-16

### Changed

- Removed array ordering, keep class, import, export, and type ordering enforced as errors to preserve deterministic organization.

## 3.0.0 - 2026-07-15

### Breaking changes

- Require ESLint 10 and Node.js `^20.19.0 || ^22.13.0 || >=24`.
- Support Flat Config only.
- Remove `eslint-config-airbnb-extended` and
  `@microsoft/eslint-plugin-sdl`; their published peer dependency ranges do
  not support ESLint 10.
- Remove the Babel parser and Babel transform plugins. ESLint now parses the
  supported modern ECMAScript syntax directly.

### Changed

- Upgrade `@stylistic/eslint-plugin` to 5.10.0,
  `eslint-plugin-n` to 18.2.2, and `eslint-plugin-security` to 4.0.1.
- Add `@eslint/js` as a direct dependency.
- Give every configuration layer a stable name for ESLint 10 diagnostics.
- Disable the core `max-len`, `function-paren-newline`, and
  `function-call-argument-newline` rules in favor of their `@stylistic`
  equivalents, eliminating duplicate reports and suppressions.
- Replace the Azure Pipelines release with GitHub Actions CI and OIDC-based npm
  Trusted Publishing.
- Add weekly safe `npm audit fix` maintenance with automatic patch releases
  when dependency security updates pass all validations.

## 2.0.3 - 2026-07-15

- Add `eslint-plugin-perfectionist` and deterministic import/declaration
  ordering.

## 2.0.0 - 2025-07-09

- Move to ESLint 9 Flat Config.
- Replace the legacy Airbnb package with `eslint-config-airbnb-extended`.
- Add the security, import, Node.js, and stylistic plugin configuration.

## 1.4.0 - 2025-07-08

- Update dependencies and address known vulnerabilities.

## 1.3.0 - 2024-10-16

- Update to ESLint 8.57.1 and Node.js 18+.
- Add early Flat Config compatibility guidance.
