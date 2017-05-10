# docker-spawner
Docker container spawner developed using Node JS

## Why docker-spawner?
- The first purpose of creating this package is to deploy Node test app automatically, using artifacts created by CIs like:
  - [Travis CI](https://travis-ci.org/).
  - [Codeship](https://codeship.com/).
  - [Gitlab CI](https://about.gitlab.com/features/gitlab-ci-cd/).
  - ...
- But actually, you can deploy any kind of app beside node, as long as it can run in [Docker](https://www.docker.com/), means nearly everything.

## How to:

### Setup
- **Requisites:**
  - [Node JS](https://nodejs.org/en/) installed.
  - [Yarn](https://github.com/yarnpkg/yarn) installed.
  - [Docker](https://www.docker.com/) installed.
  - Drive containing this app (C: | D: | E:) shared if your are on Windows (*optional*).
  - Took a look at [Docker engine API](https://docs.docker.com/engine/api/v1.28/#operation/ContainerCreate).

#### Run from [Docker container](https://www.docker.com/)
- Will be available soon...

#### Run directly from host
- Pull this repo and install dependencies using `yarn install`.
- Create a folder named after your future container name inside `artifacts` folder.
- Create `docker-spawner.json` and fill out your [container creation configurations](https://docs.docker.com/engine/api/v1.28/#operation/ContainerCreate).

## Contributes
Feel free to create any issue and I'll try to respone as soon as possible. Thank you a lot.