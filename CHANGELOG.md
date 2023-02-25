# Version history

## 1.2.0 (25/02/2023)

* Dependencies updated
  * `eslint` 8+
  * `eslint-config-airbnb-base` 15+
  * `@microsoft/eslint-plugin-sdl` 0.2.0

### 1.1.2 (17/09/2021)

* Fix problems with `@microsoft/sdl`:
  * `eslint-plugin-node` as dependency.
  * remove `eslint-plugin-security-node` because it was emitting errors.

### 1.1.1 (17/09/2021)

* Change `@microsoft/sdl` from `recommended` to `node`, that don't requires TypeScript.

### 1.1.0 (17/09/2021)
  
* Security plugins are now installed by default
* Remove the need for empty babel config
