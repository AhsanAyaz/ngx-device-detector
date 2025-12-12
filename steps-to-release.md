# Creating Releases

Make sure that you're logged in to NPM in the terminal via `npm login`.

1. `npm run bump:version <major|minor|patch>` (e.g. `npm run bump:version minor`)
2. `npm run prerelease`
3. `git add .`
4. `git commit -m "chore: release <version>"` (e.g. `git commit -m "chore: release 11.0.0"`)
5. `git tag v<version>` (e.g. `git tag v11.0.0`)
6. `git push origin master --tags`
7. `npm run release`
