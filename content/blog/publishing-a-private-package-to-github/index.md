---
title: Publishing a Private Package to GitHub
tags: ['Packages', 'NPM']
date: '2021-08-24T17:36:00.000Z'
---

Working with packages is something that is almost unavoidable in the JavaScript ecosystem, but we typically find ourselves using other peoples packages as dependencies in our projects. If you've ever wondered how to publish a package of your own, then read on.

## Prerequisites

- A GitHub account
- An NPM account
- Basic NodeJS experience
- `npm` installed

## What

I'll be building a simple package to demonstrate the process of building and publishing to GitHub.
The example I'll use is a measurement unit converter, e.g. convert miles to kilometers and vice versa. The package will contain some handy functions to crunch the numbers.

## How

### Creating the Project

We'll use [tsdx](https://tsdx.io/) to create our package, it claims to be a zero-config CLI for developing TypeScript packages. Basically saving us the legwork of dealing with boilerplate config.

To create a project:

```bash
npx tsdx create unit-converter
```

Select the basic template when prompted.

```bash
cd unit-converter
```

Now we'll just add a couple of basic functions in `src/index.ts`

```bash
export const milesToKilometers = (distance: number) => {
  return distance * 1.609344;
};

export const kilometersToMiles = (distance: number) => {
  return distance * 0.62137119223733;
};
```

If we want, we can add some test coverage for these functions too.

Next, we'll want to create a GitHub repo and push our work. The repo can be public or private, it's up to you.

### Adding Some Config to Package.json

To ensure that we publish to the correct registry, in the `package.json` add the following:

```bash
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  },
  "repository": "https://github.com/your-username/unit-converter",
```

We'll also want to update the name and description:

```bash
  "name": "@your-username/unit-converter",
  "description": "A package for converting units of measurement",
```

Now commit this change and push to the GitHub repo again.

### Creating an .npmrc File and GitHub Access Token

We now need to create a `.npmrc` file in the project root, and add the following:

```bash
//npm.pkg.github.com/:_authToken=${GITHUB_ACCESS_TOKEN}
@your-username:registry=https://npm.pkg.github.com
```

This will specify the registry for any packages prefixed with `@your-username`, it also specifies the auth token to use, which we will set in the next step using a GitHub Access Token.

Next, in GitHub we'll need to create a new Personal Access Token (PAT), which can be done in Settings -> Developer settings.

Copy the PAT and then in your terminal run:

```bash
export GITHUB_ACCESS_TOKEN=paste-access-token-here
```

Next, we need to login to NPM:

```bash
npm login
```

Enter your username, password, and email address when prompted.

### Publishing the Package

Now, we should be ready to try and publish.

Run `npm version patch` to bump our package version.

And then to test our package publish:

```bash
npm publish --dry-run
```

This will do everything except actually pushing the package to the registry. If there are no errors, we can go ahead and run it for real.

```bash
npm publish
```

And that's it! If successful then the package should be visible from the GitHub repo on the right-hand-side under the "Packages" heading. It may take a few minutes to appear the first time, so be patient.

## Summary

As we've seen, the process of publishing your first package is less daunting than it may seem. Publishing packages is a great way to start reusing utility code across your projects, or even sharing it publicly when you're ready to.
