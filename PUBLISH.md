# Publish

How to publish this package to npm.

## Releases and trusted publishing

The GitHub Actions `Publish` workflow supports manual semantic releases and a
weekly security maintenance run. Manual runs accept the version currently in
`package.json` or a `patch`, `minor`, or `major` increment. Every Monday at
11:17 UTC, the same workflow runs `npm audit fix`
without `--force`; when the lockfile changes and all validations pass, it
creates and publishes a patch release automatically.

Publishing uses npm Trusted Publishing through GitHub OIDC. No `NPM_TOKEN` is
required. Configure the package on npmjs.com with these exact values:

- provider: GitHub Actions
- organization: `nexsolab`
- repository: `eslint-config`
- workflow filename: `publish.yml`
- environment: `npm`
- allowed action: `npm publish`

Create a GitHub environment named `npm` and restrict it to the `main` branch.
Do not add required reviewers if weekly security releases must remain fully
automatic. The repository must allow GitHub Actions to write contents, and any
branch protection on `main` must allow the release workflow to push its version
commit and tag.

After confirming the first OIDC publication, configure npm publishing access
to require 2FA and disallow traditional tokens, then revoke the old automation
token.
