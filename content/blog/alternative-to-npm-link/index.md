---
title: Alternative to NPM Link
date: '2021-12-09T09:00:00.000Z'
---

When using your own NPM packages in a project, a good dev workflow is needed to make local testing and development straightforward. [Publishing your package](https://sk52.github.io/publishing-a-private-package-to-github/) to a registry makes it accessible, but before this, it is crucial to test it properly to ensure that the version you're publishing works as expected. 

[npm link](https://docs.npmjs.com/cli/v8/commands/npm-link) is usually the first port of call for this. It creates a symlink between local packages to, supposedly, make local development easier without the need to rebuild. 

## What

We'll need a package which has been developed (see [here](https://sk52.github.io/publishing-a-private-package-to-github/) for an example of building a simple package - you can skip the publishing part for this). We'll also need a simple project which uses the package as a dependency. 

## How

First, we need to install [yalc](https://www.npmjs.com/package/yalc) globally.

`npm i yalc -g`

Now, from the package we would like to link locally:

`yalc publish`

We should see something like this, confirming that it has published locally: `example-package@0.0.1 published in store.`

And then, from the project that we want to use the local version of the package in:

`yalc add example-package@0.0.1`

This will modify the package.json file to reflect that it is now using the local version of this dependency. It'll also add a `.yalc` folder and a `yalc.lock` file. 

To prevent these from being checked into version control, simply add `*yalc*` to your `.gitignore` file. 

When you're done working on it locally, remove the local yalc version of the package:

`yalc remove example-package@0.0.1`

## Summary

As we've seen, yalc is really straightforward to use. It's a helpful tool when developing packages locally. 
