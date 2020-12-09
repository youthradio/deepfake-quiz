# deepfake-quiz

> My stunning Nuxt.js project

When creating a new project from this template, you will have to add our components submodule

This command will clone the project and our components recursively
```
git clone --recursive git@github.com:youthradio/deepfake-quiz.git
```

Otherwise, this command will clone our base components repository

```bash
git submodule add git@github.com:youthradio/base-components.git components
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn run start

# generate static project
$ yarn run generate
```

## Initial setup up for gh-pages worktree branch

```

Checkout

$ git checkout --orphan gh-pages
$ git reset --hard
$ git commit --allow-empty -m "Init"
$ git checkout master

Make your worktree to your deploy folder

$ rm -rf _site
$ git worktree add _site gh-pages

```

## Deploy

```
First time
git clone --single-branch --branch gh-pages git@github.com:youthradio/PROJECTNAME.git

Update

git fetch 
git reset --hard FETCH_HEAD
git clean -df 

```

