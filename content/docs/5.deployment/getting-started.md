Workflow:

- Ensure the following is run whenever a PR is about to be merged
    - front-end unit test (Vitest)
    - front-end e2e test (Cypress)
    - front-end type-check (TypeScript)
    - back-end unit test (XUnit)
    - back-end integration tests (XUnit)

- Release triggered
    - update changelog file
    - build docker container
    - publish docker container
    - publish release on docker hub
    - publish release on GitHub
    -

## Release schedule

All changes have to go through the dev branch. Once a release is ready, it will be merged into the stable branch.

- Development (dev branch) contains latest release
    - Every push to the dev branch triggers a build and docker release
    - All releases are tagged with dev
    - All docker images are tagged with dev
    - A GitHub release is created as a pre-release
    - The Docker image is running in development mode
- Stable (master branch) contains stable release
    - Every push to the master branch triggers a build and docker release
    - All releases are tagged with a version number
    - All docker images are tagged with latest and version number
    - A GitHub release is created as the latest release
    - The Docker image is running in production mode
